import { NgModule } from '@angular/core';

import { ReviewRoutingModule } from './review-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReviewDetailComponent } from './pages/review-detail/review-detail.component';
import { WriteNewComponent } from './pages/write-new/write-new.component';
import { ReviewLayoutComponent } from './pages/review-layout/review-layout.component';

@NgModule({
  declarations: [
    ReviewDetailComponent,
    WriteNewComponent,
    ReviewLayoutComponent
  ],
  imports: [ReviewRoutingModule, SharedModule],
})
export class ReviewModule {}
