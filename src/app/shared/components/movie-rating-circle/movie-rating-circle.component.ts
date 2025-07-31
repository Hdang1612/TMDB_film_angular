import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-rating-circle',
  templateUrl: './movie-rating-circle.component.html',
  styleUrls: ['./movie-rating-circle.component.scss'],
})
export class MovieRatingCircleComponent implements OnInit {
  constructor() {}

  @Input() score: number | undefined = 0;
  percent: number = 0;
  strokeDashoffset: number = 0;

  radius = 20;
  circumference = 2 * Math.PI * this.radius; // chu vi tròn

  ngOnInit(): void {
    if (this.score) this.percent = Math.round(this.score * 10);
    this.strokeDashoffset = this.circumference * (1 - this.percent / 100); // phần bị ẩn
  }
  get strokeColor(): string {
    if (this.percent >= 70) return '#21d07a';
    if (this.percent >= 40) return '#d2d531';
    return '#db2360';
  }
}
