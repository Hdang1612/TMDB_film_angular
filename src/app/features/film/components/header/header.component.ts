import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isScrollingDown = false;
  lastScrollTop = 0;

  // smart sticky header
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 100) {
      this.isScrollingDown = true;
    } else {
      this.isScrollingDown = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
  constructor() {}

  ngOnInit(): void {}
}
