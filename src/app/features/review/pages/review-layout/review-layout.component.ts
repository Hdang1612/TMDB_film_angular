import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrendingFilm } from 'src/app/core/model/trendingMovie';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { MovieService } from 'src/app/features/film/services/movie.service';

@Component({
  selector: 'app-review-layout',
  templateUrl: './review-layout.component.html',
  styleUrls: ['./review-layout.component.scss'],
})
export class ReviewLayoutComponent implements OnInit {
  movie!: any;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const movieId = params.get('movieId');
      this.movieService.getDetail(movieId).subscribe({
        next: (res) => {
          console.log('detail', res);
          this.movie = {
            ...res,
            poster_path: getFullImageUrl(res.poster_path),
          };
        },
        error: (err) => {
          alert(err.error);
        },
      });
    });
  }
}
