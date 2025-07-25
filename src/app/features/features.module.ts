import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature/feature.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [FeatureComponent],
  imports: [CommonModule, FeaturesRoutingModule, HttpClientModule],
})
export class FeaturesModule {}
