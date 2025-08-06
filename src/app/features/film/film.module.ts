import { NgModule } from '@angular/core';
import { FilmRoutingModule } from './film-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { pages } from './pages';
import { components } from './components';

const PAGES = pages;
const COMPONENTS = components;

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [FilmRoutingModule, SharedModule],
  providers: [],
})
export class FilmModule {}
