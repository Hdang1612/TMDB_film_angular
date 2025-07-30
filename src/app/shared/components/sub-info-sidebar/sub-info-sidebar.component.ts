import { Component, Input, OnInit } from '@angular/core';
import { SubInfoSidebarConfig } from '../../../features/film/models/section';

@Component({
  selector: 'app-sub-info-sidebar',
  templateUrl: './sub-info-sidebar.component.html',
  styleUrls: ['./sub-info-sidebar.component.scss'],
})
export class SubInfoSidebarComponent implements OnInit {
  @Input() config!: SubInfoSidebarConfig;
  constructor() {}

  ngOnInit(): void {}
}
