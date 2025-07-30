import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { pipes } from './pipes';

const COMPONENTS = [...components];
const PIPES = [...pipes];
@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class SharedModule {}
