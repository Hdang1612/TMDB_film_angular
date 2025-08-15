import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DETAIL_SECTIONS } from 'src/app/core/utils/constants/mock-data';
import { MovieService } from '../../services/movie.service';
import {
  FavoriteReq,
  MovieDetail,
  MovieState,
  WatchListReq,
} from '../../../../core/model/movieDetail';
import { getFullImageUrl, loadSocialLinks } from 'src/app/core/utils/img.utils';
import { CastMember } from '../../../../core/model/credit';
import { environment } from 'src/environments/environment';
import {
  Observable,
  combineLatest,
  map,
  shareReplay,
  switchMap,
  tap,
  startWith,
  of,
  catchError,
} from 'rxjs';
import { SubInfoSidebarConfig } from '../../../../core/model/section';
import { getBackdropGradientFromImage } from 'src/app/core/utils/backdrop-color.utils';
import { GlobalFeedbackService } from 'src/app/core/services/feedback.service';
@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailComponent implements OnInit {
  detailSection = DETAIL_SECTIONS;
  trailerKey!: string;
  isTrailerModalOpen: boolean = false;
  backdropGradient$!: Observable<string>;
  media = {
    videos: [],
    backdrops: [],
    posters: [],
  };
  stateIcon = {
    favorite: '',
    watchList: '',
  };
  movieId!: string | null;
  subInfoSidebarConfig!: SubInfoSidebarConfig;
  movieState!: MovieState;

  data$!: Observable<{
    loading: boolean;
    data: {
      // genres: string;
      detail: MovieDetail;
      genreNames: string;
      cast: CastMember[];
      socialLinks: any;
      keywords: string[];
      recommendations: any[];
      reviews: any[];
      trailerKey: string;
      media: {
        videos: any[];
        backdrops: any[];
        posters: any[];
      };
      movieState: MovieState;
    } | null;
  }>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private feedBack: GlobalFeedbackService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        if (!id) return of({ loading: false, data: null });
        return combineLatest([
          this.movieService.getDetail(id),
          this.movieService.getCredit(id),
          this.movieService
            .getExternalId(id, 'movie')
            .pipe(catchError(() => of({}))),
          this.movieService
            .getKeyword(id, 'movie')
            .pipe(catchError(() => of({ keywords: [] }))),
          this.movieService
            .getRecommendation(id)
            .pipe(catchError(() => of({ results: [] }))),
          this.movieService
            .getReviews(id, 1)
            .pipe(catchError(() => of({ results: [] }))),
          this.movieService
            .getBestTrailerKey(id)
            .pipe(catchError(() => of(''))),
          combineLatest([
            this.movieService.getImages(id),
            this.movieService.getTrailer(id),
          ]),
          this.movieService.getMovieState(id, 'movie'),
        ]).pipe(
          map(
            ([
              detail,
              cast,
              social,
              keywords,
              recommend,
              reviews,
              trailerKey,
              [images, trailer],
              movieState,
            ]) => {
              // dl Phim
              const mappedDetail = {
                ...detail,
                poster_path: getFullImageUrl(detail.poster_path),
                backdrop_path: getFullImageUrl(detail.backdrop_path, 'w1920'),
              };

              // dl Cast
              const mappedCast = cast.cast.map((c) => ({
                ...c,
                profile_path: !c.profile_path
                  ? c.gender === 1
                    ? environment.tempFemaleUserUrlImg
                    : environment.tempMaleUserUrlImg
                  : getFullImageUrl(c.profile_path),
              }));

              // danh sách media
              const backdrops = images.backdrops.map((i: any) => ({
                ...i,
                type: 'image',
                file_path: getFullImageUrl(i.file_path, 'w780'),
              }));
              const posters = images.posters.map((i: any) => ({
                ...i,
                type: 'image',
                file_path: getFullImageUrl(i.file_path, 'w200'),
              }));
              const videos = trailer.results.map((v: any) => ({
                ...v,
                type: 'video',
                key: v.key,
              }));

              return {
                loading: false,
                data: {
                  detail: mappedDetail,
                  genreNames: (() => {
                    const genres = mappedDetail.genres || [];
                    const names = genres.slice(0, 2).map((g) => g.name);
                    return genres.length > 2
                      ? names.join(', ') + ', ...'
                      : names.join(', ');
                  })(),
                  cast: mappedCast,
                  socialLinks: loadSocialLinks(social),
                  keywords: keywords.keywords.map((k: any) => k.name),
                  recommendations: recommend.results.map((m: any) => ({
                    ...m,
                    poster_path: getFullImageUrl(m.poster_path),
                    backdrop_path: getFullImageUrl(m.backdrop_path),
                  })),
                  reviews: reviews.results,
                  trailerKey,
                  media: { backdrops, posters, videos },
                  movieState,
                },
              };
            }
          ),
          startWith({ loading: true, data: null }),
          tap(({ data }) => {
            // xử lý các dữ liệu liên quan
            if (!data) return;
            const {
              detail,
              socialLinks,
              keywords,
              media,
              cast,
              reviews,
              recommendations,
              movieState,
            } = data;
            // gán data cho các section
            this.setPopularToSection(media);
            this.media = media;
            this.subInfoSidebarConfig = {
              socialLinks,
              items: [
                { label: 'Status', value: detail.status },
                { label: 'Release', value: detail.release_date },
                {
                  label: 'Original Language',
                  value: detail.original_language,
                },
                { label: 'Budget', value: detail.budget, isCurrency: true },
                { label: 'Revenue', value: detail.revenue, isCurrency: true },
              ],
              keywords,
            };
            this.detailSection.find((s) => s.key === 'cast')!.data = cast;
            this.detailSection.find((s) => s.key === 'social')!.data = reviews;
            this.detailSection.find((s) => s.key === 'recommend')!.data =
              recommendations;

            this.backdropGradient$ = new Observable<string>((observer) => {
              getBackdropGradientFromImage(
                data.detail.backdrop_path,
                (gradient) => {
                  observer.next(gradient);
                  observer.complete();
                }
              );
            });

            this.stateIcon.favorite = movieState.favorite
              ? 'assets/icons/heart-fill.svg'
              : 'assets/icons/heart-white.svg';

            this.stateIcon.watchList = movieState.watchlist
              ? 'assets/icons/watch-list-fill.svg'
              : 'assets/icons/watch-list-white.svg';

            this.movieState = movieState;
            this.movieId = detail.id.toString();
          }),
          shareReplay(1)
        );
      })
    );
  }

  private setPopularToSection(media: any): void {
    const section = this.detailSection.find((s) => s.key === 'media');
    if (!section) return;
    section.data = [
      media.videos?.[0],
      media.backdrops?.[0],
      media.posters?.[0],
    ];
  }

  onClickGetTrailer(id: string | null) {
    this.movieService.getBestTrailerKey(id).subscribe({
      next: (key) => {
        if (key) {
          this.trailerKey = key;
          this.isTrailerModalOpen = true;
          this.cd.markForCheck();
        } else {
          alert('err.');
        }
      },
    });
  }

  // get genreNames(): string {
  //   const genres = this.detail?.genres || [];
  //   const names = genres.slice(0, 2).map((g) => g.name);
  //   return genres.length > 2 ? names.join(', ') + ', ...' : names.join(', ');
  // }

  onSectionBtnClick(sectionKey: string, value: string): void {
    const section = this.detailSection.find((s) => s.key === sectionKey);
    if (!section) return;

    switch (value) {
      case 'popular':
        const popularItem = [
          this.media.videos?.[0],
          this.media.backdrops?.[0],
          this.media.posters?.[0],
        ];
        section.data = popularItem ? popularItem : [];
        break;

      case 'video':
        section.data = this.media.videos || [];
        break;

      case 'backdrop':
        section.data = this.media.backdrops || [];
        break;

      case 'poster':
        section.data = this.media.posters || [];
        break;
    }
  }

  // toggle favorite/watchlist
  toggleFavorite() {
    const newState: FavoriteReq = {
      media_type: 'movie',
      media_id: this.movieId,
      favorite: !this.movieState?.favorite,
    };

    this.movieService.updateFavorite(newState).subscribe({
      next: (res) => {
        if (res.success) {
          this.movieState.favorite = newState.favorite;
          this.stateIcon.favorite = newState.favorite
            ? 'assets/icons/heart-fill.svg'
            : 'assets/icons/heart-white.svg';
          this.feedBack.show(res.status_message, 'success');
          this.cd.markForCheck();
        }
      },
      error: (err) => {
        this.feedBack.show(err.error.status_message, 'error');
      },
    });
  }

  toggleWatchList() {
    const newState: WatchListReq = {
      media_type: 'movie',
      media_id: this.movieId,
      watchlist: !this.movieState?.watchlist,
    };

    this.movieService.updateWatchList(newState).subscribe({
      next: (res) => {
        if (res.success) {
          this.movieState.watchlist = newState.watchlist;
          this.stateIcon.watchList = newState.watchlist
            ? 'assets/icons/watch-list-fill.svg'
            : 'assets/icons/watch-list-white.svg';
          this.feedBack.show(res.status_message, 'success');
          this.cd.markForCheck();
        }
      },
      error: (err) => {
        this.feedBack.show(err.error.status_message, 'error');
      },
    });
  }
}
