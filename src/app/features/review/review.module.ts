import { NgModule } from '@angular/core';

import { ReviewRoutingModule } from './review-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReviewDetailComponent } from './pages/review-detail/review-detail.component';
import { WriteNewComponent } from './pages/write-new/write-new.component';
import { ReviewLayoutComponent } from './pages/review-layout/review-layout.component';
import { pages } from './pages';

const PAGES = pages;
@NgModule({
  declarations: [...PAGES],
  imports: [ReviewRoutingModule, SharedModule],
})
export class ReviewModule {}
