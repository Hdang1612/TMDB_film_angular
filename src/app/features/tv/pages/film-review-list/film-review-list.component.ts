import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review, ReviewResponse } from '../../../../core/model/review';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-film-review-list',
  templateUrl: './film-review-list.component.html',
  styleUrls: ['./film-review-list.component.scss'],
})
export class FilmReviewListComponent implements OnInit {
  result!: Review[];
  backdropGradient: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  id!: string | null;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log('id', this.id);
      this.currentPage = 1;
      this.loadReviewList(this.id, this.currentPage);
    });
  }

  loadReviewList(id: string | null, page: number) {
    this.movieService.getReviews(id, page).subscribe({
      next: (res) => {
        console.log('reviews', res.results);
        this.result = res.results;
        this.totalPages = res.total_pages;
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }
  paginate(page: number) {
    this.currentPage = page;
    this.loadReviewList(this.id, page);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadReviewList(this.id, this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadReviewList(this.id, this.currentPage);
    }
  }

  navigateWrite() {
    this.router.navigate(['review/new'], {
      queryParams: { movieId: this.id },
    });
  }
}
