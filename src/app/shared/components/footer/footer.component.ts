import { Component, OnInit } from '@angular/core';
import { FOOTER_NAVS } from 'src/app/core/utils/constants/mock-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerNavs = FOOTER_NAVS;
  constructor() {}

  ngOnInit(): void {}
}
