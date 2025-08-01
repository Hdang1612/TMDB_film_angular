import { Component, HostListener, OnInit } from '@angular/core';
import { MOVIE_TYPE_MAP } from 'src/app/core/utils/constants/mock-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isScrollingDown = false;
  lastScrollTop = 0;
  movieMenu = [
    { path: '', label: 'Popular' },
    { path: 'upcoming', label: 'Upcoming' },
    { path: 'top-rated', label: 'Top Rated' },
    { path: 'now-playing', label: 'Now Playing' },
  ];

  tvShowMenu = [
    { path: '', label: 'Popular' },
    { path: 'airing-today', label: 'Airing Today' },
    { path: 'on-tv', label: 'On TV' },
    { path: 'top-rated', label: 'Top Rated' },
  ];

  peopleMenu = [{ path: '', label: 'Popular People' }];
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
