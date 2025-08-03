import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeopleResponse, PersonDetail } from 'src/app/core/model/credit';

@Injectable({ providedIn: 'root' })
export class ProfileService {
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
  getUserProfile(): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrlMovie}account/${environment.accountId}`, {
        ...this.options,
      })
      .pipe(catchError(this.handleError()));
  }
}
