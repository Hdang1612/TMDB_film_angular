import { ReviewModule } from './../review/review.module';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { MovieLayoutComponent } from './pages/movie-layout/movie-layout.component';
import { FilmListComponent } from './pages/film-list/film-list.component';
import { FilmCastListComponent } from './pages/film-cast-list/film-cast-list.component';
import { MovieDetailLayoutComponent } from './pages/movie-detail-layout/movie-detail-layout.component';
import { FilmReviewListComponent } from './pages/film-review-list/film-review-list.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: MovieLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'movie/:id',
        children: [
          { path: '', component: FilmDetailComponent },
          {
            path: '',
            component: MovieDetailLayoutComponent,
            children: [
              {
                path: 'season',
                component: FilmDetailComponent,
              },
              {
                path: 'cast',
                component: FilmCastListComponent,
              },
              {
                path: 'social',
                component: FilmReviewListComponent,
              },
            ],
          },
        ],
      },

      {
        path: 'movies',
        component: FilmListComponent,
      },
      {
        path: 'movies/:type',
        component: FilmListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmRoutingModule {}
