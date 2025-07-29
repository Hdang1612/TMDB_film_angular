import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { MovieLayoutComponent } from './pages/movie-layout/movie-layout.component';
import { FilmListComponent } from './pages/film-list/film-list.component';
import { MovieListLayoutComponent } from './pages/movie-list-layout/movie-list-layout.component';

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
        path: 'movie/:id',
        component: FilmDetailComponent,
      },
      {
        path: 'movies',
        component: FilmListComponent,
        // children: [
        //   {
        //     path: '',
        //     component: FilmListComponent,
        //   },
        //   {
        //     path: ':type',
        //     component: FilmListComponent,
        //   },
        // ],
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
