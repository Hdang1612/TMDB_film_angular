import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-rating-circle',
  templateUrl: './movie-rating-circle.component.html',
  styleUrls: ['./movie-rating-circle.component.scss'],
})
export class MovieRatingCircleComponent implements OnInit {
  constructor() {}

  @Input() score: number = 0; // từ 0–10
  percent: number = 0; // chuyển về % (0–100)
  strokeDashoffset: number = 0;

  readonly radius = 15;
  readonly circumference = 2 * Math.PI * this.radius;

  ngOnInit(): void {
    this.percent = Math.round(this.score * 10); // convert 7.1 -> 71%
    this.strokeDashoffset = this.circumference * (1 - this.percent / 100);
  }
}
