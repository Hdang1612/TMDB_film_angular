import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': environment.apiKey,
    }),
  };
  private handleError() {
    return (error: any) => {
      return throwError(() => error);
    };
  }
  constructor(private http: HttpClient) {}
}
