import { Component, OnInit } from '@angular/core';
import {
  HOME_SECTIONS,
  leaderboardMockData,
} from 'src/app/core/utils/constants/mock-data';
import { MovieService } from '../../services/movie.service';
import { TrendingFilm } from '../../../../core/model/trendingMovie';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies!: TrendingFilm[];
  homeSection = HOME_SECTIONS;
  leaderBoardData = leaderboardMockData;
  constructor(
    private movieService: MovieService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadSectionData('trending', () =>
      this.movieService.getTrendingList('day')
    );
    this.loadSectionData('trailer', () =>
      this.movieService.getListMovie(1, 'upcoming')
    );
    this.loadSectionData('popular', () =>
      this.movieService.getListMovie(1, 'popular')
    );
  }
  loadList(time_window: string) {
    this.movieService.getTrendingList(time_window).subscribe({
      next: (res) => {
        const mappedMovies = res.results.map((movie: TrendingFilm) => ({
          ...movie,
          poster_path: getFullImageUrl(movie.poster_path),
          backdrop_path: getFullImageUrl(movie.backdrop_path),
        }));
        const trendingSection = this.homeSection.find(
          (section) => section.key === 'trending'
        );
        if (trendingSection) {
          trendingSection.data = mappedMovies;
        }
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }
  loadSectionData(
    sectionKey: string,
    fetchFn: () => Observable<{ results: TrendingFilm[] }>
  ): void {
    fetchFn().subscribe({
      next: (res) => {
        const mapped = res.results.map((movie: TrendingFilm) => ({
          ...movie,
          poster_path: getFullImageUrl(movie.poster_path),
          backdrop_path: getFullImageUrl(movie.backdrop_path),
        }));

        const section = this.homeSection.find((s) => s.key === sectionKey);
        if (section) section.data = mapped;
      },
      error: (err) => {
        console.error(`Error loading section [${sectionKey}]`, err);
      },
    });
  }
}
