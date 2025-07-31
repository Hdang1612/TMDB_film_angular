import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { pipes } from './pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { InputDateRangeComponent } from './components/input-date-range/input-date-range.component';
import { InputMultiSelectComponent } from './components/input-multi-select/input-multi-select.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';

const COMPONENTS = [...components];
const PIPES = [...pipes];
@NgModule({
  declarations: [...COMPONENTS, ...PIPES, InputTextComponent, InputSelectComponent, InputDateRangeComponent, InputMultiSelectComponent, InputRadioComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
