import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
export const DEFAULT_TIMEOUT = 30000;
@Injectable()
export class AthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = environment.apiKey;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next.handle(authReq).pipe(
      timeout(DEFAULT_TIMEOUT),
      tap({
        next: (event) => {
          // log hoặc xử lý response nếu cần
          console.log('✅ Response received');
        },
        error: (error: HttpErrorResponse) => {
          console.error('❌ HTTP error:', error.message);
        },
      })
    );
  }
}
