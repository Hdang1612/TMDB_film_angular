import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CastListComponent } from './pages/cast-list/cast-list.component';
import { PeopleLayoutComponent } from './pages/people-layout/people-layout.component';
import { PeopleDetailComponent } from './pages/people-detail/people-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleLayoutComponent,
    children: [
      { path: 'popular', component: CastListComponent },
      { path: ':id', component: PeopleDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
