import { Component, OnInit } from '@angular/core';
import { POPULAR_MOVIE } from 'src/app/core/utils/constants/mock-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies = POPULAR_MOVIE;
  constructor() {}

  ngOnInit(): void {}
}
