import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BigFilmCardComponent } from './components/big-film-card/big-film-card.component';

@NgModule({
  declarations: [ProfileLayoutComponent, WatchlistComponent, FavoriteComponent, BigFilmCardComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
