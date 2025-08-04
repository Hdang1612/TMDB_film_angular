import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieLayoutComponent } from './pages/movie-layout/movie-layout.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { MovieDetailLayoutComponent } from './pages/movie-detail-layout/movie-detail-layout.component';
import { FilmCastListComponent } from './pages/film-cast-list/film-cast-list.component';
import { FilmReviewListComponent } from './pages/film-review-list/film-review-list.component';
import { FilmListComponent } from './pages/film-list/film-list.component';

const routes: Routes = [
  {
    path: '',
    component: MovieLayoutComponent,
    children: [
      {
        path: 'tv/:id',
        children: [
          { path: '', component: FilmDetailComponent },
          {
            path: '',
            component: MovieDetailLayoutComponent,
            children: [
              { path: 'season', component: FilmDetailComponent },
              { path: 'cast', component: FilmCastListComponent },
              { path: 'social', component: FilmReviewListComponent },
            ],
          },
        ],
      },
      { path: 'tvs', component: FilmListComponent },
      { path: 'tvs/:type', component: FilmListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvRoutingModule {}
