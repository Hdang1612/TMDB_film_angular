import { Component, OnInit } from '@angular/core';
import { ReviceService } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/core/model/review';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss'],
})
export class ReviewDetailComponent implements OnInit {
  detail!: Review;
  constructor(
    private reviewService: ReviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.loadReview(id);
    });
  }
  loadReview(id: string | null) {
    this.reviewService.getDetailReview(id).subscribe({
      next: (res) => {
        console.log(res);
        this.detail = res;
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }
}
