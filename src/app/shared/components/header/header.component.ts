import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isScrollingDown = false;
  lastScrollTop = 0;
  userData: { username: string } | null = null;
  isSearchOpen = false;
  searchQuery = '';
  @ViewChild('searchBtn') searchBtn!: ElementRef;

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
  @HostListener('document:click', ['$event'])
  clickOutsideSearch(event: MouseEvent) {
    if (
      this.isSearchOpen &&
      this.searchBtn.nativeElement &&
      !this.searchBtn.nativeElement.contains(event.target)
    )
      this.isSearchOpen = false;
  }
  constructor(private router: Router, private eRef: ElementRef) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      this.userData = JSON.parse(stored);
    }
  }
  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }
  onSearch() {
    console.log('searchhhh', this.searchQuery);
    if (!this.searchQuery.trim()) return;
    this.isSearchOpen = false;
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchQuery.trim() },
    });
  }
}
