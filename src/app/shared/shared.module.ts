import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { components } from './components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { pipes } from './pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [...components];
const PIPES = [...pipes];
const MODULES = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
];
@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [...MODULES],
  exports: [...COMPONENTS, ...PIPES, ...MODULES],
  providers: [DatePipe],
})
export class SharedModule {}
