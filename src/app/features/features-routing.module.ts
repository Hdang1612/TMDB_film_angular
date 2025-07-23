import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature/feature.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: 'movie',
        loadChildren: () =>
          import('./film/film.module').then((m) => m.FilmModule),
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
