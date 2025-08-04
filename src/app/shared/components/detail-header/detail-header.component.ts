import { Component, Input, OnInit } from '@angular/core';
import { MovieDetail } from '../../../core/model/movieDetail';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../features/film/services/movie.service';
import { getBackdropGradientFromImage } from 'src/app/core/utils/backdrop-color.utils';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss'],
})
export class DetailHeaderComponent implements OnInit {
  @Input() id!: string | null;
  detail!: MovieDetail;
  backdropGradient: string = '';
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadDetail(this.id);
  }
  loadDetail(id: string | null) {
    this.movieService.getDetail(id).subscribe({
      next: (res) => {
        console.log('detail', res);
        this.detail = res;
        if (this.detail.backdrop_path) {
          getBackdropGradientFromImage(
            getFullImageUrl(res.backdrop_path, 'w1920'),
            (gradient) => {
              this.backdropGradient = gradient;
            }
          );
        }
        console.log(this.backdropGradient);
      },
      
    });
  }
}
