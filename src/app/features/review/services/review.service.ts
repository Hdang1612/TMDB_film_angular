import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PeopleResponse } from 'src/app/core/model/credit';
import { Review } from 'src/app/core/model/review';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ReviceService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  langParam = new HttpParams().set('language', 'en-US');
  private handleError() {
    return (error: any) => {
      return throwError(() => error);
    };
  }
  constructor(private http: HttpClient) {}
  getDetailReview(id: string | null): Observable<Review> {
    return this.http
      .get<Review>(`${environment.baseUrlMovie}review/${id}`)
      .pipe(catchError(this.handleError()));
  }
}
