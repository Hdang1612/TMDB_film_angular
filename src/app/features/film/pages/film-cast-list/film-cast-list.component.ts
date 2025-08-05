import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieDetail } from '../../../../core/model/movieDetail';
import { CastResponse } from '../../../../core/model/credit';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { getBackdropGradientFromImage } from 'src/app/core/utils/backdrop-color.utils';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-film-cast-list',
  templateUrl: './film-cast-list.component.html',
  styleUrls: ['./film-cast-list.component.scss'],
})
export class FilmCastListComponent implements OnInit {
  detail!: MovieDetail;
  result!: CastResponse;
  backdropGradient: string = '';
  castList$!: Observable<{ loading: boolean; data: CastResponse | null }>;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    // console.log('cast list >>>>', this.castList$);
  }

  ngOnInit(): void {
    this.castList$ = this.route.parent!.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        if (!id)
          return of({
            loading: false,
            data: null,
          });

        return this.movieService.getCredit(id).pipe(
          map((res) => ({
            loading: false,
            data: {
              ...res,
              cast: res.cast.map((c) => ({
                ...c,
                profile_path: c.profile_path
                  ? getFullImageUrl(c.profile_path)
                  : c.gender === 1
                  ? environment.tempFemaleUserUrlImg
                  : environment.tempMaleUserUrlImg,
              })),
              crew: res.crew.map((c) => ({
                ...c,
                profile_path: c.profile_path
                  ? getFullImageUrl(c.profile_path)
                  : c.gender === 1
                  ? environment.tempFemaleUserUrlImg
                  : environment.tempMaleUserUrlImg,
              })),
            },
          })),
          startWith({ loading: true, data: null })
        );
      })
    );
  }
}
