import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DETAIL_SECTIONS } from 'src/app/core/utils/constants/mock-data';
import { MovieService } from '../../services/movie.service';
import { MovieDetail } from '../../../../core/model/movieDetail';
import { getFullImageUrl, loadSocialLinks } from 'src/app/core/utils/img.utils';
import { TMDBTrailer } from '../../models/trailer';
import ColorThief from 'colorthief';
import { CastMember } from '../../../../core/model/credit';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { TrendingFilm } from '../../../../core/model/trendingMovie';
import { RecommendationFilm } from '../../models/recomendation';
import { SubInfoSidebarConfig } from '../../../../core/model/section';
import { getBackdropGradientFromImage } from 'src/app/core/utils/backdrop-color.utils';
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
  subInfoSidebarConfig!: SubInfoSidebarConfig;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService // public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('Route changed, new ID:', id);

      this.loadDetail(id);
      this.loadCredit(id);
      this.loadSocialIcon(id);
      this.loadKeyword(id);
      this.loadSectionData('recommend', () =>
        this.movieService.getRecommendation(id)
      );
      this.loadSectionData('social', () => this.movieService.getReviews(id, 1));
      this.loadMediaData(id);
    });
  }

  loadDetail(id: string | null) {
    this.movieService.getDetail(id).subscribe({
      next: (res) => {
        console.log('detail', res);
        this.detail = {
          ...res,
          poster_path: getFullImageUrl(res.poster_path),
          backdrop_path: getFullImageUrl(res.backdrop_path, 'w1920'),
        };
        if (this.detail.backdrop_path) {
          getBackdropGradientFromImage(
            this.detail.backdrop_path,
            (gradient) => {
              this.backdropGradient = gradient;
            }
          );
        }
        this.subInfoSidebarConfig = {
          socialLinks: [],
          items: [
            { label: 'Status', value: this.detail.status },
            { label: 'Release', value: this.detail.release_date },
            {
              label: 'Original Language',
              value: this.detail.original_language,
            },
            { label: 'Budget', value: this.detail.budget, isCurrency: true },
            { label: 'Revenue', value: this.detail.revenue, isCurrency: true },
          ],
          keywords: [],
        };
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }

  loadCredit(id: string | null) {
    this.movieService.getCredit(id).subscribe({
      next: (res) => {
        console.log('credit', res);
        const mapped = res.cast.map((movie: CastMember) => ({
          ...movie,
          profile_path: !movie.profile_path
            ? movie.gender === 1
              ? environment.tempFemaleUserUrlImg
              : environment.tempMaleUserUrlImg
            : getFullImageUrl(movie.profile_path),

          // backdrop_path: getFullImageUrl(movie.backdrop_path),
        }));

        const section = this.detailSection.find((s) => s.key === 'cast');
        if (section) section.data = mapped;
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }
  loadSocialIcon(id: string | null) {
    this.movieService.getExternalId(id, 'movie').subscribe({
      next: (res) => {
        const map = loadSocialLinks(res);
        this.subInfoSidebarConfig.socialLinks = map;
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }
  loadKeyword(id: string | null) {
    this.movieService.getKeyword(id, 'movie').subscribe({
      next: (res) => {
        this.subInfoSidebarConfig.keywords = res.keywords.map((item: any) => {
          return item.name;
        });
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
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
  loadSectionData(
    sectionKey: string,
    fetchFn: () => Observable<{ results: any[] }>
  ): void {
    fetchFn().subscribe({
      next: (res) => {
        const mapped = res.results?.map((movie: any) => ({
          ...movie,
          poster_path: getFullImageUrl(movie.poster_path),
          backdrop_path: getFullImageUrl(movie.backdrop_path),
        }));
        console.log(res.results);
        console.log(res);

        const section = this.detailSection.find((s) => s.key === sectionKey);
        if (section) section.data = mapped;
        console.log(sectionKey, section?.data);
      },
      error: (err) => {
        console.error(`Error loading section [${sectionKey}]`, err);
      },
    });
  }
  loadMediaData(id: string | null): void {
    let imagesLoaded = false;
    let trailersLoaded = false;

    const checkAndSetPopular = () => {
      if (imagesLoaded && trailersLoaded) {
        this.onSectionBtnClick('media', 'popular');
      }
    };

    this.movieService.getImages(id).subscribe({
      next: (res) => {
        this.media.backdrops = res.backdrops.map((image: any) => ({
          ...image,
          type: 'image',
          file_path: getFullImageUrl(image.file_path, 'w780'),
        }));
        this.media.posters = res.posters.map((image: any) => ({
          ...image,
          type: 'image',
          file_path: getFullImageUrl(image.file_path, 'w200'),
        }));
        imagesLoaded = true;
        checkAndSetPopular();
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });

    this.movieService.getTrailer(id).subscribe({
      next: (res) => {
        this.media.videos = res.results.map((video: any) => ({
          ...video,
          type: 'video',
          key: video.key,
        }));
        trailersLoaded = true;
        checkAndSetPopular();
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
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
}
