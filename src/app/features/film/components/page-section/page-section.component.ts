import { Component, Input, OnInit } from '@angular/core';
import { SectionModel } from '../../models/section';

@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.scss'],
})
export class PageSectionComponent implements OnInit {
  @Input() section: SectionModel = {
    key: '',
    title: '',
    btnGroup: [],
    isMovieHorizontal: false,
    isRecommendation: false,
    data: [],
    subNav: '',
  };
  activeBtnIndex: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
