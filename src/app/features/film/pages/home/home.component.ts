import { Component, OnInit } from '@angular/core';
import {
  HOME_SECTIONS,
  leaderboardMockData,
  POPULAR_MOVIE,
} from 'src/app/core/utils/constants/mock-data';
import { MovieService } from '../../services/movie.service';
import { TrendingFilm } from '../../models/trendingMovie';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies!: TrendingFilm[];
  homeSection = HOME_SECTIONS;
  leaderBoardData = leaderboardMockData;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadSectionData('trending', () =>
      this.movieService.getTrendingList('day')
    );
    this.loadSectionData('trailer', () => this.movieService.getUpcomingList(1));
    this.loadSectionData('popular', () => this.movieService.getPopularList(1));
  }
  // loadList(time_window: string) {
  //   this.movieService.getTrendingList(time_window).subscribe({
  //     next: (res) => {
  //       const mappedMovies = res.results.map((movie: TrendingFilm) => ({
  //         ...movie,
  //         poster_path: getFullImageUrl(movie.poster_path),
  //         backdrop_path: getFullImageUrl(movie.backdrop_path),
  //       }));
  //       const trendingSection = this.homeSection.find(
  //         (section) => section.key === 'trending'
  //       );
  //       if (trendingSection) {
  //         trendingSection.data = mappedMovies;
  //       }
  //     },
  //     error: (err) => {
  //       alert(err.error?.error);
  //     },
  //   });
  //   this.movieService.getUpcomingList(1).subscribe({
  //     next: (res) => {
  //       const mappedMovies = res.results.map((movie: TrendingFilm) => ({
  //         ...movie,
  //         poster_path: getFullImageUrl(movie.poster_path),
  //         backdrop_path: getFullImageUrl(movie.backdrop_path),
  //       }));
  //       const trendingSection = this.homeSection.find(
  //         (section) => section.key === 'trailer'
  //       );
  //       if (trendingSection) {
  //         trendingSection.data = mappedMovies;
  //       }
  //     },
  //   });
  // }
  loadSectionData(
    sectionKey: string,
    fetchFn: () => Observable<{ results: TrendingFilm[] }>
  ): void {
    fetchFn().subscribe({
      next: (res) => {
        const mapped = res.results.map((movie: TrendingFilm) => ({
          ...movie,
          poster_path: getFullImageUrl(movie.poster_path),
          backdrop_path: getFullImageUrl(movie.backdrop_path),
        }));

        const section = this.homeSection.find((s) => s.key === sectionKey);
        if (section) section.data = mapped;
      },
      error: (err) => {
        console.error(`Error loading section [${sectionKey}]`, err);
      },
    });
  }
}
