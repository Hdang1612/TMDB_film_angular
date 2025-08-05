import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { TrendingFilm } from '../../../../core/model/trendingMovie';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { MOVIE_TYPE_MAP } from 'src/app/core/utils/constants/mock-data';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  filmList: TrendingFilm[] = [];
  // filmList$: Observable<{ loading: boolean; data: TrendingFilm | null }>;
  currentPage: number = 1;
  totalPages: number = 0;
  selectedMenuCardId: number | null = null;
  movieType: string = 'popular';
  title: string = '';
  params: any;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const routeType = params.get('type') || '';
      const mapped = MOVIE_TYPE_MAP[routeType] || MOVIE_TYPE_MAP[''];
      this.movieType = mapped.type;
      this.title = mapped.title;
      this.currentPage = 1;
      this.getMovies(this.currentPage);
      // this.filmList$ = this.route.paramMap.pipe(
      //   map((params) => params.get('type')),
      //   switchMap((type) => {
      //     if (!type) return of({ loading: false, data: null });
      //     return this.movieService.getListMovie(this.currentPage)
      //   })
      // );
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

  getMoviesViaParams(param: any, page: number) {
    this.movieService.getDiscoveryMovies({ ...param, page: page }).subscribe({
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
    if (this.params) {
      this.getMoviesViaParams(this.params, page);
      this.currentPage = page;
    } else {
      this.getMovies(page);
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      if (this.params) {
        this.getMoviesViaParams(this.params, this.currentPage);
      } else this.getMoviesViaParams(this.params, this.currentPage);
      this.getMoviesViaParams(this.params, this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.params) {
        this.getMoviesViaParams(this.params, this.currentPage);
      } else this.getMoviesViaParams(this.params, this.currentPage);
    }
  }

  handleOpenMenu(id: number) {
    this.selectedMenuCardId = this.selectedMenuCardId === id ? null : id;
  }

  handleSearchResult(res: any) {
    console.log(res);
    this.params = res;
    console.log(this.params);
    this.getMoviesViaParams(this.params, 1);
  }
}
