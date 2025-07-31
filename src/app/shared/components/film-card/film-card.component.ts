import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from '../../../features/film/services/movie.service';
import { TMDBTrailer } from '../../../features/film/models/trailer';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {
  @Input() movie!: any;
  @Input() cardType: 'default' | 'trailer' | 'recommendation' | 'cast' =
    'default';
  @Input() isHorizontal: boolean = false;
  @Input() isRecommendation: boolean = false;
  @Output() openMenu = new EventEmitter<void>();
  trailerKey!: string;
  isTrailerModalOpen: boolean = false;
  @Input() isMenuOpen: boolean = false;
  constructor(private trailerService: MovieService, private router: Router) {}

  ngOnInit(): void {}
  onClickGetTrailer(id: string | null) {
    this.trailerService.getBestTrailerKey(id).subscribe({
      next: (key) => {
        if (key) {
          this.trailerKey = key;
          this.isTrailerModalOpen = true;
        } else {
          alert('Không tìm thấy trailer.');
        }
      },
      error: (err) => {
        alert(err.error?.error);
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
      this.router.navigate(['/movie', id]);
    }
  }

  handleOpenMenu(event: MouseEvent) {
    event.stopPropagation();
    this.openMenu.emit();
  }
}
