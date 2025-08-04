import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, switchMap, of, tap } from 'rxjs';
import { MovieService } from 'src/app/features/film/services/movie.service';
import { TrendingFilm } from 'src/app/core/model/trendingMovie';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent implements OnInit {
  profile: any;

  currentPage$ = new BehaviorSubject<number>(1);
  loading$ = new BehaviorSubject<boolean>(true);

  listType$ =
    this.route.parent?.url.pipe(
      map((params) => params[0]?.path || 'favorite')
    ) ?? of('favorite');

  type$ = this.route.params.pipe(
    map((params: Params) => params['type'] ?? 'movie')
  );

  favoriteMovies$ = combineLatest([
    this.listType$,
    this.type$,
    this.currentPage$,
  ]).pipe(
    tap(() => this.loading$.next(true)),
    switchMap(([listType, type, page]) => {
      const mediaType = type === 'movie' ? 'movies' : 'tv';
      return listType === 'watchlist'
        ? this.movieService.getWatchList(mediaType, page)
        : this.movieService.getFavorite(mediaType, page);
    }),
    map((res) => ({
      results: res.results.map((m: TrendingFilm) => ({
        ...m,
        poster_path: getFullImageUrl(m.poster_path),
      })),
      totalPages: res.total_pages,
      totalItems: res.total_results,
    })),
    tap(() => this.loading$.next(false))
  );

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      this.profile = JSON.parse(stored);
    }
  }

  paginate(page: number) {
    this.currentPage$.next(page);
  }

  nextPage(totalPages: number) {
    const current = this.currentPage$.value;
    if (current < totalPages) {
      this.currentPage$.next(current + 1);
    }
  }

  prevPage() {
    const current = this.currentPage$.value;
    if (current > 1) {
      this.currentPage$.next(current - 1);
    }
  }

  navigateTo(type: string): void {
    const listType = this.route.parent?.snapshot.url[0]?.path ?? 'favorite';
    this.router.navigate(['/u', this.profile.username, listType, type]);
    this.currentPage$.next(1);
  }

  onRemoved() {
    this.currentPage$.next(this.currentPage$.value);
  }
}
