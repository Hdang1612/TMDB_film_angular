import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
  query: string = '';
  currentPage$ = new BehaviorSubject<number>(1);
  movies$ = combineLatest([
    this.route.queryParams.pipe(map((params: Params) => params['query'] || '')),
    this.currentPage$,
  ]).pipe(
    switchMap(([query, page]) => {
      this.query = query;

      if (!query) {
        return of({ loading: false, data: null });
      }

      return this.movieService.searchMovie(query, page).pipe(
        map((res) => ({
          loading: false,
          data: {
            ...res,
            results: res.results.map((movie: any) => ({
              ...movie,
              poster_path: getFullImageUrl(movie.poster_path),
            })),
            totalPages: res.total_pages,
          },
        })),
        startWith({ loading: true, data: null })
      );
    }),
    tap((res) => console.log('>>>', res))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.query = params['query'] || '';
    const page = +params['page'] || 1;
    // this.loading$.next(true);
    this.currentPage$.next(page);
  }

  paginate(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.query, page },
      queryParamsHandling: 'merge', // giữ lại query param đã có , chỉ thay đổi hoặc thêm cái truyền vào
    });
    this.currentPage$.next(page);
  }

  nextPage(totalPages: number) {
    const current = this.currentPage$.value;
    if (current < totalPages) {
      this.paginate(current + 1);
    }
  }

  prevPage() {
    const current = this.currentPage$.value;
    if (current > 1) {
      this.paginate(current - 1);
    }
  }
}
