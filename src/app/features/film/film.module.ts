import { NgModule } from '@angular/core';

import { FilmRoutingModule } from './film-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { pages } from './pages';
import { components } from './components';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const PAGES = pages;
const COMPONENTS = components;

@NgModule({
  declarations: [...PAGES, ...COMPONENTS, SearchPageComponent],
  imports: [FilmRoutingModule, SharedModule],
  providers: [],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class FilmModule {}
