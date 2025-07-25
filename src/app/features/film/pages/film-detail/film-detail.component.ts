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
import ColorThief from 'colorthief';
@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss'],
})
export class FilmDetailComponent implements OnInit {
  detail!: MovieDetail;
  detailSection = DETAIL_SECTIONS;
  trailerKey!: string;
  isTrailerModalOpen: boolean = false;
  backdropGradient: string = '';
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
          backdrop_path: getFullImageUrl(res.backdrop_path, 'w1920'),
        };
        if (this.detail.backdrop_path) {
          this.loadBackdropColor(this.detail.backdrop_path);
        }
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
          alert('err.');
        }
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }

  // lấy  màu chủ đạo của backdrop
  loadBackdropColor(imageUrl: string) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img);

      this.backdropGradient = `
      linear-gradient(
        to right,
        rgba(${r}, ${g}, ${b}, 1) calc((50vw - 170px) - 340px),
        rgba(${r}, ${g}, ${b}, 0.84) 50%,
        rgba(${r}, ${g}, ${b}, 0.84) 100%
      )
    `.trim();
    };
  }

  get genreNames(): string {
    const genres = this.detail?.genres || [];
    const names = genres.slice(0, 2).map((g) => g.name);
    return genres.length > 2 ? names.join(', ') + ', ...' : names.join(', ');
  }
}
