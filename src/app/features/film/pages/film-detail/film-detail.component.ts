import { Component, OnInit } from '@angular/core';
import { mockMovieDetail } from 'src/app/core/utils/constants/mock-data';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss'],
})
export class FilmDetailComponent implements OnInit {
  detail = mockMovieDetail;
  constructor() {}

  ngOnInit(): void {}
}
