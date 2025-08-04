import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature/feature.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./film/film.module').then((m) => m.FilmModule),
      },
      {
        path: '',
        loadChildren: () => import('./tv/tv.module').then((m) => m.TvModule),
      },
      {
        path: 'person',
        loadChildren: () =>
          import('./people/people.module').then((m) => m.PeopleModule),
      },
      {
        path: 'review',
        loadChildren: () =>
          import('./review/review.module').then((m) => m.ReviewModule),
      },
      {
        path: 'u',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
