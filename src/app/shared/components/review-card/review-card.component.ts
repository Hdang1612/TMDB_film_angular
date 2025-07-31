import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../../core/model/review';
import { environment } from 'src/environments/environment';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
})
export class ReviewCardComponent implements OnInit {
  @Input() reviewData!: Review;
  @Input() movieId!: string | null;
  @Input() type: 'full' | 'default' = 'full';
  baseUrlImg = environment.baseUrlImg;
  avt: string = '';
  rating: number = 0;
  Object: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const author = this.reviewData?.author_details;
    this.avt = author?.avatar_path
      ? getFullImageUrl(author?.avatar_path)
      : environment.tempFemaleUserUrlImg;

    this.rating = author?.rating != null ? author.rating * 10 : 0;
    // console.log('data review', this.reviewData);
  }
  navigate() {
    if (this.type === 'default') {
      this.router.navigate(['/review', this.reviewData.id], {
        queryParams: { movieId: this.movieId },
      });
    }
  }
}
