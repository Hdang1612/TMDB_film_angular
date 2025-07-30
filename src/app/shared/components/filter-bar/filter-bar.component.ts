import { Component, OnInit } from '@angular/core';
import { FILTER_SECTIONS } from 'src/app/core/utils/constants/mock-data';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  filterSections = FILTER_SECTIONS;
  constructor() {}

  ngOnInit(): void {}
}
