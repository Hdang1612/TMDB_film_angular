import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmRoutingModule } from './film-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { HomeComponent } from './pages/home/home.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { MovieLayoutComponent } from './pages/movie-layout/movie-layout.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FilmCardComponent,
    HomeComponent,
    FilmDetailComponent,
    MovieLayoutComponent
  ],
  imports: [
    CommonModule,
    FilmRoutingModule
  ]
})
export class FilmModule { }
