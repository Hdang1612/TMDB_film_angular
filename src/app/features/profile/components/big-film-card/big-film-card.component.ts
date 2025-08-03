import { Component, Input, OnInit } from '@angular/core';
import { TrendingFilm } from 'src/app/core/model/trendingMovie';

@Component({
  selector: 'app-big-film-card',
  templateUrl: './big-film-card.component.html',
  styleUrls: ['./big-film-card.component.scss'],
})
export class BigFilmCardComponent implements OnInit {
  @Input() film!: TrendingFilm;
  constructor() {}

  ngOnInit(): void {}
}
