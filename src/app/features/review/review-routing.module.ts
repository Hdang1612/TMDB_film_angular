import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewDetailComponent } from './pages/review-detail/review-detail.component';
import { WriteNewComponent } from './pages/write-new/write-new.component';
import { ReviewLayoutComponent } from './pages/review-layout/review-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewLayoutComponent,
    children: [
      {
        path: 'new',
        component: WriteNewComponent,
      },
      {
        path: ':id',
        component: ReviewDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
