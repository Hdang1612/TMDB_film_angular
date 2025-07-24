import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.scss'],
})
export class PageSectionComponent implements OnInit {
  @Input() section!: {
    key: string;
    title: string;
    btnGroup: { label: string }[];
    isMovieHorizontal: boolean;
    data: any[];
    subNav: string;
  };

  constructor() {}

  ngOnInit(): void {}
}
