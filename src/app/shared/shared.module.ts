import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { pipes } from './pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [...components];
const PIPES = [...pipes];
@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
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
