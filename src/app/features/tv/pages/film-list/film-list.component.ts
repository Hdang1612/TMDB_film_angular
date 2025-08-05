import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TrendingFilm } from '../../../../core/model/trendingMovie';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import {
  MOVIE_TYPE_MAP,
  TV_SHOW_TYPE_MAP,
} from 'src/app/core/utils/constants/mock-data';
import { TvService } from '../../services/movie.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  filmList: TrendingFilm[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  selectedMenuCardId: number | null = null;

  movieType: string = 'popular';
  title: string = '';

  constructor(private movieService: TvService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const routeType = params.get('type') || '';
      const mapped = TV_SHOW_TYPE_MAP[routeType] || TV_SHOW_TYPE_MAP[''];
      this.movieType = mapped.type;
      this.title = mapped.title;
      this.currentPage = 1;
      this.getMovies(this.currentPage);
    });
  }

  getMovies(page: number) {
    this.movieService.getListMovie(page, this.movieType).subscribe({
      next: (res) => {
        this.filmList = res.results.map((movie: TrendingFilm) => ({
          ...movie,
          poster_path: getFullImageUrl(movie.poster_path),
          backdrop_path: getFullImageUrl(movie.backdrop_path),
        }));
        this.totalPages = res.total_pages;
      },
    });
  }

  paginate(page: number) {
    this.currentPage = page;
    this.getMovies(page);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getMovies(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMovies(this.currentPage);
    }
  }

  handleOpenMenu(id: number) {
    this.selectedMenuCardId = this.selectedMenuCardId === id ? null : id;
  }

  handleSearchResult(res: any) {
    console.log(res);
    this.filmList = res.results.map((movie: TrendingFilm) => ({
      ...movie,
      poster_path: getFullImageUrl(movie.poster_path),
      backdrop_path: getFullImageUrl(movie.backdrop_path),
    }));
    this.totalPages = res.total_pages;
    this.currentPage = 1;
  }
}
