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
    this.route.parent?.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('id', id);
      this.loadCastList(id);
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
