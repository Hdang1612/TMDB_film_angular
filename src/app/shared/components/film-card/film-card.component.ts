import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MovieService } from '../../../features/film/services/movie.service';
import { TMDBTrailer } from '../../../features/film/models/trailer';
import { Route, Router } from '@angular/router';
import {
  FavoriteReq,
  MovieState,
  WatchListReq,
} from 'src/app/core/model/movieDetail';
import { GlobalFeedbackService } from 'src/app/core/services/feedback.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {
  @Input() movie!: any;
  @Input() cardType: 'default' | 'trailer' | 'recommendation' | 'cast' =
    'default';
  @Input() mediaType: 'movie' | 'tv' = 'movie';
  @Input() isHorizontal: boolean = false;
  @Input() isRecommendation: boolean = false;
  @Output() openMenu = new EventEmitter<void>();
  trailerKey!: string;
  isTrailerModalOpen: boolean = false;
  @Input() isMenuOpen: boolean = false;
  // @ViewChild('cardContainer', { static: true }) cardContainer!: ElementRef;
  movieState?: MovieState;
  isLoadingMovieState = true;
  constructor(
    private trailerService: MovieService,
    private router: Router,
    private eRef: ElementRef,
    private feedBack: GlobalFeedbackService
  ) {}

  ngOnInit(): void {}
  onClickGetTrailer(id: string | null) {
    this.trailerService.getBestTrailerKey(id).subscribe({
      next: (key) => {
        if (key) {
          this.trailerKey = key;
          this.isTrailerModalOpen = true;
        } else {
          alert('not foundd');
        }
      },
    });
  }
  get imagePath(): string {
    if (this.cardType === 'cast') {
      return this.movie.profile_path;
    } else if (this.cardType === 'default') {
      return this.movie.poster_path;
    }

    return this.movie.backdrop_path;
  }

  navigate(id: number) {
    if (this.cardType === 'cast') {
      this.router.navigate(['/person', id]);
    } else {
      this.router.navigate([`/${this.mediaType}`, id]);
    }
  }

  handleOpenMenu(event: MouseEvent) {
    console.log('[film-card] clicked menu for id:', this.movie?.id);
    event.stopPropagation();
    this.isMenuOpen = true;
    this.openMenu.emit(this.movie.id);
    if (!this.movieState) {
      this.trailerService
        .getMovieState(this.movie.id, this.mediaType)
        .subscribe({
          next: (state) => {
            // this.openMenu.emit(this.movie.id);
            this.movieState = state;
            this.isLoadingMovieState = false;
          },
        });
    }
    // else {
    //   this.openMenu.emit(this.movie.id);
    // }
  }
  @HostListener('document:click', ['$event']) // lắng nghe sk click trên trang , sau đó truyền mouse event vào hàm
  onClickOutside(event: MouseEvent) {
    if (
      this.isMenuOpen && //menu đang mở
      this.eRef.nativeElement && // có Dom element
      !this.eRef.nativeElement.contains(event.target) // ko click vâo comp card-container
    ) {
      this.isMenuOpen = false;
    }
  }

  toggleFavorite(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const newState: FavoriteReq = {
      media_type: this.mediaType,
      media_id: this.movie.id,
      favorite: !this.movieState?.favorite,
    };

    this.trailerService.updateFavorite(newState).subscribe({
      next: (res) => {
        if (this.movieState) this.movieState.favorite = newState.favorite;
        this.feedBack.show(res.status_message, 'success');
      },
      error: (err) => {
        this.feedBack.show(err.error.status_message, 'error');
      },
    });
  }

  toggleWatchlist(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const newState: WatchListReq = {
      media_type: this.mediaType,
      media_id: this.movie.id,
      watchlist: !this.movieState?.watchlist,
    };

    this.trailerService.updateWatchList(newState).subscribe({
      next: (res) => {
        if (this.movieState) this.movieState.watchlist = newState.watchlist;
        this.feedBack.show(res.status_message, 'success');
      },
      error: (err) => {
        this.feedBack.show(err.error.status_message, 'error');
      },
    });
  }
}
