import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { TrendingFilm } from '../../../../core/model/trendingMovie';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { MOVIE_TYPE_MAP } from 'src/app/core/utils/constants/mock-data';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  filmList: TrendingFilm[] = [];
  filmList$!: Observable<{
    loading: boolean;
    data: TrendingFilm[];
    totalPages: number;
  }>;

  currentPage$ = new BehaviorSubject<number>(1);
  searchParams$ = new BehaviorSubject<any>(null);
  selectedRouteType$!: Observable<{ type: string; title: string }>;
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
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   const routeType = params.get('type') || '';
    //   const mapped = MOVIE_TYPE_MAP[routeType] || MOVIE_TYPE_MAP[''];
    //   this.movieType = mapped.type;
    //   this.title = mapped.title;
    //   this.currentPage = 1;
    //   this.getMovies(this.currentPage);
    // });
    this.selectedRouteType$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('type') || ''),
      map((typeParam) => MOVIE_TYPE_MAP[typeParam] || MOVIE_TYPE_MAP['']),
      tap((mapped) => {
        this.movieType = mapped.type;
        this.title = mapped.title;
        console.log('type ', mapped.type);
        this.currentPage$.next(1);
        this.searchParams$.next(null);
      })
    );

    this.filmList$ = combineLatest([
      this.selectedRouteType$,
      this.currentPage$,
      this.searchParams$,
    ]).pipe(
      switchMap(([mapped, page, params]) => {
        const fetch$ = params
          ? this.movieService.getDiscoveryMovies({ ...params, page })
          : this.movieService.getListMovie(page, mapped.type);

        return fetch$.pipe(
          map((res) => ({
            loading: false,
            data: res.results.map((movie: TrendingFilm) => ({
              ...movie,
              poster_path: getFullImageUrl(movie.poster_path),
              backdrop_path: getFullImageUrl(movie.backdrop_path),
            })),
            totalPages: res.total_pages,
          })),
          startWith({
            loading: true,
            data: [],
            totalPages: 0,
          })
        );
      }),
      tap((res) => console.log('filmList$', res))
    );
  }

  // getMovies(page: number) {
  //   this.movieService.getListMovie(page, this.movieType).subscribe({
  //     next: (res) => {
  //       this.filmList = res.results.map((movie: TrendingFilm) => ({
  //         ...movie,
  //         poster_path: getFullImageUrl(movie.poster_path),
  //         backdrop_path: getFullImageUrl(movie.backdrop_path),
  //       }));
  //       this.totalPages = res.total_pages;
  //     },
  //   });
  // }

  // getMoviesViaParams(param: any, page: number) {
  //   this.movieService.getDiscoveryMovies({ ...param, page: page }).subscribe({
  //     next: (res) => {
  //       this.filmList = res.results.map((movie: TrendingFilm) => ({
  //         ...movie,
  //         poster_path: getFullImageUrl(movie.poster_path),
  //         backdrop_path: getFullImageUrl(movie.backdrop_path),
  //       }));
  //       this.totalPages = res.total_pages;
  //     },
  //   });
  // }

  // paginate(page: number) {
  //   if (this.params) {
  //     this.getMoviesViaParams(this.params, page);
  //     this.currentPage = page;
  //   } else {
  //     this.getMovies(page);
  //     this.currentPage = page;
  //   }
  // }

  // nextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     if (this.params) {
  //       this.getMoviesViaParams(this.params, this.currentPage);
  //     } else this.getMoviesViaParams(this.params, this.currentPage);
  //     this.getMoviesViaParams(this.params, this.currentPage);
  //   }
  // }

  // prevPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     if (this.params) {
  //       this.getMoviesViaParams(this.params, this.currentPage);
  //     } else this.getMoviesViaParams(this.params, this.currentPage);
  //   }
  // }

  // handleOpenMenu(id: number) {
  //   this.selectedMenuCardId = this.selectedMenuCardId === id ? null : id;
  // }

  // handleSearchResult(res: any) {
  //   console.log(res);
  //   this.params = res;
  //   console.log(this.params);
  //   this.getMoviesViaParams(this.params, 1);
  // }
  paginate(page: number) {
    this.currentPage$.next(page);
  }

  nextPage(totalPages: number) {
    const nextPage = this.currentPage$.value + 1;
    if (nextPage <= totalPages) {
      this.currentPage$.next(nextPage);
    }
  }

  prevPage() {
    const prevPage = this.currentPage$.value - 1;
    if (prevPage >= 1) {
      this.currentPage$.next(prevPage);
    }
  }

  handleOpenMenu(id: number) {
    this.selectedMenuCardId = this.selectedMenuCardId === id ? null : id;
  }

  handleSearchResult(res: any) {
    this.searchParams$.next(res);
    this.currentPage$.next(1);
  }
}
