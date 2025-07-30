import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieDetail } from '../../models/movieDetail';
import { CastResponse } from '../../models/credit';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { getBackdropGradientFromImage } from 'src/app/core/utils/backdrop-color.utils';

@Component({
  selector: 'app-film-cast-list',
  templateUrl: './film-cast-list.component.html',
  styleUrls: ['./film-cast-list.component.scss'],
})
export class FilmCastListComponent implements OnInit {
  detail!: MovieDetail;
  result!: CastResponse;
  backdropGradient: string = '';
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.loadDetail(id);
      this.loadCastList(id);
    });
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
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }
  loadCastList(id: string | null) {
    this.movieService.getCredit(id).subscribe({
      next: (res) => {
        this.result = {
          ...res,
          cast: res.cast.map((c) => ({
            ...c,
            profile_path: getFullImageUrl(c.profile_path),
          })),
          crew: res.crew.map((c) => ({
            ...c,
            profile_path: getFullImageUrl(c.profile_path),
          })),
        };
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }
}
