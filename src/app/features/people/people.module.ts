import { NgModule } from '@angular/core';

import { PeopleRoutingModule } from './people-routing.module';
import { CastListComponent } from './pages/cast-list/cast-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PeopleLayoutComponent } from './pages/people-layout/people-layout.component';
import { PeopleDetailComponent } from './pages/people-detail/people-detail.component';

@NgModule({
  declarations: [CastListComponent, PeopleLayoutComponent, PeopleDetailComponent],
  imports: [PeopleRoutingModule, SharedModule],
})
export class PeopleModule {}
