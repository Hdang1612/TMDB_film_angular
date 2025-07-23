import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature/feature.component';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [FeatureComponent],
  imports: [CommonModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
