import { error } from 'console';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrendingFilm } from 'src/app/core/model/trendingMovie';
import { MovieService } from 'src/app/features/film/services/movie.service';

@Component({
  selector: 'app-people-layout',
  templateUrl: './people-layout.component.html',
  styleUrls: ['./people-layout.component.scss'],
})
export class PeopleLayoutComponent implements OnInit {
  movie!: TrendingFilm;
  constructor() {}

  ngOnInit(): void {}
}
