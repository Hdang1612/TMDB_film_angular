import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { TMDBTrailer } from '../../models/trailer';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {
  @Input() movie!: any;
  @Input() isHorizontal: boolean = false;
  @Input() isRecommendation: boolean = false;
  trailerKey!: string;
  isTrailerModalOpen: boolean = false;
  constructor(private trailerService: MovieService) {}

  ngOnInit(): void {}
  onClickGetTrailer(id: number) {
    this.trailerService.getTrailer(id).subscribe({
      next: (res) => {
        console.log(res);
        const mapOffical = res.results.find(
          (video: TMDBTrailer) => video.name === 'Official Trailer'
        );
        const fallback = res.results.find(
          (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        console.log(mapOffical);
        if (mapOffical) {
          this.trailerKey = mapOffical.key;
          this.isTrailerModalOpen = true;
        } else {
          this.trailerKey = fallback.key;
          this.isTrailerModalOpen = true;
        }
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }
  
}
