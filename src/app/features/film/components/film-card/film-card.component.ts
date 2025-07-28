import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { TMDBTrailer } from '../../models/trailer';
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
  trailerKey!: string;
  isTrailerModalOpen: boolean = false;
  constructor(private trailerService: MovieService, private router: Router) {}

  ngOnInit(): void {}
  onClickGetTrailer(id: number) {
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
    this.router.navigate(['/movie/detail', id]);
  }
}
