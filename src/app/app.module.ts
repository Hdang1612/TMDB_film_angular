import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundPageComponent } from './shared/maintainces/notfound-page/notfound-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AthInterceptor } from './core/interceptor/auth-interceptor';

@NgModule({
  declarations: [AppComponent, NotfoundPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
