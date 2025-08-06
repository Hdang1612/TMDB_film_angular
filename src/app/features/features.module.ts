import { NgModule } from '@angular/core';
import { FeatureComponent } from './feature/feature.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FeatureComponent],
  imports: [FeaturesRoutingModule, SharedModule],
})
export class FeaturesModule {}
