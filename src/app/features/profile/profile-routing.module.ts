import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';

const routes: Routes = [
  {
    path: ':username',
    component: ProfileLayoutComponent,
    children: [
      // {
      //   path: 'watchlist',
      //   children: [
      //     {
      //       path: '',
      //       pathMatch: 'full',
      //       redirectTo: 'movie',
      //     },
      //     {
      //       path: ':type',
      //       component: FavoriteComponent,
      //     },
      //   ],
      // },
      // {
      //   path: 'favorite',
      //   children: [
      //     {
      //       path: '',
      //       pathMatch: 'full',
      //       redirectTo: 'movie',
      //     },
      //     {
      //       path: ':type',
      //       component: FavoriteComponent,
      //     },
      //   ],
      // },
      {
        path: 'favorite',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'movie' },
          { path: ':type', component: FavoriteComponent },
        ],
      },
      {
        path: 'watchlist',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'movie' },
          { path: ':type', component: FavoriteComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
