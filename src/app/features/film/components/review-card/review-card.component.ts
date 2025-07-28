import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';
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
  baseUrlImg = environment.baseUrlImg;
  avt: string = '';
  rating: number = 0;
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
    this.router.navigate([this.reviewData.url]);
    // console.log('navigate to review', this.reviewData.url);
  }
}
