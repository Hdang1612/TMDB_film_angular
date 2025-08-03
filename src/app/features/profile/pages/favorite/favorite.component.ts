import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/features/film/services/movie.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favoriteMovies: any[] = [];
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadFavoriteMovies();
  }
  loadFavoriteMovies(): void {
    this.movieService.getFavorite('movies', 1).subscribe({
      next: (res) => {
        this.favoriteMovies = res.results.map((movie: any) => ({
          title: movie.title,
          posterUrl: 'https://image.tmdb.org/t/p/w300' + movie.poster_path,
          releaseDate: movie.release_date,
          overview: movie.overview,
          voteAverage: movie.vote_average, // convert to %
        }));
      },
      error: (err) => {
        console.error('Failed to load favorites:', err);
      },
    });
  }
}
