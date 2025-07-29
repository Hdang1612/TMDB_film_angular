import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmRoutingModule } from './film-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { HomeComponent } from './pages/home/home.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { MovieLayoutComponent } from './pages/movie-layout/movie-layout.component';
import { UserLeaderboardItemComponent } from './components/user-leaderboard-item/user-leaderboard-item.component';
import { EditorBarComponent } from './components/editor-bar/editor-bar.component';
import { PageSectionComponent } from './components/page-section/page-section.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TrailerModalComponent } from './components/trailer-modal/trailer-modal.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { FilmListComponent } from './pages/film-list/film-list.component';
import { MovieListLayoutComponent } from './pages/movie-list-layout/movie-list-layout.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CardSkeletonComponent } from './components/card-skeleton/card-skeleton.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FilmCardComponent,
    HomeComponent,
    FilmDetailComponent,
    MovieLayoutComponent,
    UserLeaderboardItemComponent,
    EditorBarComponent,
    PageSectionComponent,
    TrailerModalComponent,
    ReviewCardComponent,
    VideoCardComponent,
    FilterBarComponent,
    FilmListComponent,
    MovieListLayoutComponent,
    PaginationComponent,
    CardSkeletonComponent,
  ],
  imports: [CommonModule, FilmRoutingModule, HttpClientModule],
  providers: [],
})
export class FilmModule {}
