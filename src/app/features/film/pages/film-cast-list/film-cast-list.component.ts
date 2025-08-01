import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieDetail } from '../../../../core/model/movieDetail';
import { CastResponse } from '../../../../core/model/credit';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { getBackdropGradientFromImage } from 'src/app/core/utils/backdrop-color.utils';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-film-cast-list',
  templateUrl: './film-cast-list.component.html',
  styleUrls: ['./film-cast-list.component.scss'],
})
export class FilmCastListComponent implements OnInit {
  detail!: MovieDetail;
  result!: CastResponse;
  backdropGradient: string = '';
  castList$!: Observable<CastResponse>;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    // console.log('cast list >>>>', this.castList$);
  }

  ngOnInit(): void {
    this.castList$ = this.route.parent!.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => this.movieService.getCredit(id)),
      map((res) => ({
        ...res,
        cast: res.cast.map((c) => ({
          ...c,
          profile_path: getFullImageUrl(c.profile_path),
        })),
        crew: res.crew.map((c) => ({
          ...c,
          profile_path: getFullImageUrl(c.profile_path),
        })),
      }))
    );
    this.castList$.subscribe((data) => {
      console.log('Cast list data:', data);
    });
  }
}
