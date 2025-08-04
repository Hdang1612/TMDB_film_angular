import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DETAIL_SECTIONS } from 'src/app/core/utils/constants/mock-data';
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
} from 'rxjs';
import { TrendingFilm } from '../../../../core/model/trendingMovie';
import { RecommendationFilm } from '../../models/recomendation';
import { SubInfoSidebarConfig } from '../../../../core/model/section';
import { getBackdropGradientFromImage } from 'src/app/core/utils/backdrop-color.utils';
import { LoadingService } from 'src/app/core/services/loading.service';
import { GlobalFeedbackService } from 'src/app/core/services/feedback.service';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss'],
})
export class FilmDetailComponent implements OnInit {
  detail!: MovieDetail;
  detailSection = DETAIL_SECTIONS;
  trailerKey!: string;
  isTrailerModalOpen: boolean = false;
  backdropGradient: string = '';
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
  loadingDetail$ = this.loadingService.isLoading('detail-film');
  loadingActor$ = this.loadingService.isLoading('actor');
  movieState$!: Observable<MovieState>;
  movieState!: MovieState;
  detail$!: Observable<MovieDetail>;
  cast$!: Observable<CastMember[]>;
  socialLinks$!: Observable<any>;
  keywords$!: Observable<any>;
  recommendations$!: Observable<any[]>;
  reviews$!: Observable<any[]>;
  trailerKey$!: Observable<string>;
  media$!: Observable<{
    videos: any[];
    backdrops: any[];
    posters: any[];
  }>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService, // public loadingService: LoadingService
    private loadingService: LoadingService,
    private feedBack: GlobalFeedbackService
  ) {}

  ngOnInit(): void {
    const id$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      shareReplay(1)
    );
    this.detail$ = id$.pipe(
      tap(() => this.loadingService.setLoading('detail-film', true)),
      switchMap((id) => this.movieService.getDetail(id)),
      map((res) => ({
        ...res,
        poster_path: getFullImageUrl(res.poster_path),
        backdrop_path: getFullImageUrl(res.backdrop_path, 'w1920'),
      })),
      tap((movieDetail) => {
        getBackdropGradientFromImage(movieDetail.backdrop_path, (gradient) => {
          this.backdropGradient = gradient;
        });
        this.subInfoSidebarConfig = {
          socialLinks: [],
          items: [
            { label: 'Status', value: movieDetail.status },
            { label: 'Release', value: movieDetail.release_date },
            {
              label: 'Original Language',
              value: movieDetail.original_language,
            },
            { label: 'Budget', value: movieDetail.budget, isCurrency: true },
            { label: 'Revenue', value: movieDetail.revenue, isCurrency: true },
          ],
          keywords: [],
        };
      }),
      tap(() => this.loadingService.setLoading('detail-film', false))
    );
    this.cast$ = id$.pipe(
      switchMap((id) => this.movieService.getCredit(id)),
      map((res) =>
        res.cast.map((movie: CastMember) => ({
          ...movie,
          profile_path: !movie.profile_path
            ? movie.gender === 1
              ? environment.tempFemaleUserUrlImg
              : environment.tempMaleUserUrlImg
            : getFullImageUrl(movie.profile_path),
        }))
      ),
      tap((mapped) => {
        const section = this.detailSection.find((s) => s.key === 'cast');
        if (section) section.data = mapped;
      })
    );

    this.socialLinks$ = id$.pipe(
      switchMap((id) => this.movieService.getExternalId(id, 'movie')),
      map((res) => loadSocialLinks(res)),
      tap((result) => {
        if (this.subInfoSidebarConfig) {
          this.subInfoSidebarConfig.socialLinks = result;
        }
      })
    );

    this.keywords$ = id$.pipe(
      switchMap((id) => this.movieService.getKeyword(id, 'movie')),
      map((res) => res.keywords.map((item: any) => item.name)),
      tap((res) => {
        if (this.subInfoSidebarConfig) {
          this.subInfoSidebarConfig.keywords = res;
        }
      })
    );

    this.recommendations$ = id$.pipe(
      switchMap((id) => this.movieService.getRecommendation(id)),
      map((res) =>
        res.results.map((m: any) => ({
          ...m,
          poster_path: getFullImageUrl(m.poster_path),
          backdrop_path: getFullImageUrl(m.backdrop_path),
        }))
      ),
      tap((res) => {
        const section = this.detailSection.find((s) => s.key === 'recommend');
        if (section) section.data = res;
        console.log(this.subInfoSidebarConfig);
      })
    );

    this.reviews$ = id$.pipe(
      switchMap((id) => this.movieService.getReviews(id, 1)),
      map((res) => res.results),
      tap((res) => {
        const section = this.detailSection.find((s) => s.key === 'social');
        if (section) section.data = res;
      })
    );

    this.trailerKey$ = id$.pipe(
      switchMap((id) => this.movieService.getBestTrailerKey(id))
    );

    this.media$ = id$.pipe(
      switchMap((id) =>
        combineLatest([
          this.movieService.getImages(id),
          this.movieService.getTrailer(id),
        ])
      ),
      map(([images, trailer]) => {
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
        return { backdrops, posters, videos };
      }),
      tap((media) => {
        this.media = media;
        this.setPopularToSection(media);
      }),
      shareReplay(1)
    );
    this.movieState$ = id$.pipe(
      switchMap((id) => this.movieService.getMovieState(id)),
      tap((res) => {
        this.movieState = res;
        this.stateIcon.favorite = res.favorite
          ? 'assets/icons/heart-fill.svg'
          : 'assets/icons/heart-white.svg';
        this.stateIcon.watchList = res.watchlist
          ? 'assets/icons/watch-list-fill.svg'
          : 'assets/icons/watch-list-white.svg';
        console.log('first', this.stateIcon);
      })
    );
    id$.subscribe((id) => {
      this.movieId = id;
    });
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
        } else {
          alert('err.');
        }
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }

  get genreNames(): string {
    const genres = this.detail?.genres || [];
    const names = genres.slice(0, 2).map((g) => g.name);
    return genres.length > 2 ? names.join(', ') + ', ...' : names.join(', ');
  }

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
      media_type: 'tv',
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
        }
      },
      error: (err) => {
        this.feedBack.show(err.error.status_message, 'error');
      },
    });
  }

  toggleWatchList() {
    const newState: WatchListReq = {
      media_type: 'tv',
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
        }
      },
      error: (err) => {
        this.feedBack.show(err.error.status_message, 'error');
      },
    });
  }
}
