import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteReq, WatchListReq } from 'src/app/core/model/movieDetail';
import { TrendingFilm } from 'src/app/core/model/trendingMovie';
import { GlobalFeedbackService } from 'src/app/core/services/feedback.service';
import { MovieService } from 'src/app/features/film/services/movie.service';

@Component({
  selector: 'app-big-film-card',
  templateUrl: './big-film-card.component.html',
  styleUrls: ['./big-film-card.component.scss'],
})
export class BigFilmCardComponent implements OnInit {
  @Input() film!: TrendingFilm;
  @Input() type!: 'movie' | 'tv';
  @Input() listType!: string | null;
  @Output() removed = new EventEmitter<string>();
  constructor(
    private router: Router,
    private service: MovieService,
    private feedBack: GlobalFeedbackService
  ) {}

  ngOnInit(): void {}
  navigate() {
    this.router.navigate([`/${this.type}`, this.film.id]);
  }

  removeFavorite() {
    const newState: FavoriteReq = {
      media_type: this.type,
      media_id: this.film.id + '',
      favorite: false,
    };
    const newWatchListState: WatchListReq = {
      media_type: this.type,
      media_id: this.film.id + '',
      watchlist: false,
    };
    if (this.listType === 'favorite') {
      this.service.updateFavorite(newState).subscribe({
        next: (res) => {
          this.feedBack.show(res.status_message, 'success');
          this.removed.emit();
        },
        error: (err) => {
          this.feedBack.show(err.error.status_message, 'error');
        },
      });
    } else if (this.listType === 'watchlist') {
      this.service.updateWatchList(newWatchListState).subscribe({
        next: (res) => {
          this.feedBack.show(res.status_message, 'success');
          this.removed.emit();
        },
        error: (err) => {
          this.feedBack.show(err.error.status_message, 'error');
        },
      });
    }
  }
}
