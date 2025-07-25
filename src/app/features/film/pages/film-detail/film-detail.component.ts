import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DETAIL_SECTIONS,
  mockMovieDetail,
} from 'src/app/core/utils/constants/mock-data';
import { MovieService } from '../../services/movie.service';
import { MovieDetail } from '../../models/movieDetail';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { TMDBTrailer } from '../../models/trailer';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss'],
})
export class FilmDetailComponent implements OnInit {
  detail: MovieDetail = mockMovieDetail;
  detailSection = DETAIL_SECTIONS;
  trailerKey!: string;
  isTrailerModalOpen: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = routeParams.get('id');
    this.loadDetail(id);
  }

  loadDetail(id: string | null) {
    this.movieService.getDetail(id).subscribe({
      next: (res) => {
        console.log('detail', res);
        this.detail = {
          ...res,
          poster_path: getFullImageUrl(res.poster_path),
          backdrop_path: getFullImageUrl(res.backdrop_path),
        };
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }
  onClickGetTrailer(id: number) {
    this.movieService.getBestTrailerKey(id).subscribe({
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
}
