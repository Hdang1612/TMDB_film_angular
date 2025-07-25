import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundPageComponent } from './shared/maintainces/notfound-page/notfound-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
  },
  { path: 'notfound', component: NotfoundPageComponent },
  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Scroll lên đầu mỗi khi navigate , back lại router cũ thì trở về vị trí trước khi navigate
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
