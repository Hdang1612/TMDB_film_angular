import { Component, OnInit } from '@angular/core';
import {
  DETAIL_SECTIONS,
  mockMovieDetail,
} from 'src/app/core/utils/constants/mock-data';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss'],
})
export class FilmDetailComponent implements OnInit {
  detail = mockMovieDetail;
  detailSection = DETAIL_SECTIONS;
  constructor() {}

  ngOnInit(): void {}
}
