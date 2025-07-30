import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TrendingFilmResponse } from '../../../core/model/trendingMovie';
import { environment } from 'src/environments/environment';
import { PeopleResponse, PersonDetail } from 'src/app/core/model/credit';

@Injectable({ providedIn: 'root' })
export class PersonService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'api-key': environment.apiKey,
    }),
  };
  langParam = new HttpParams().set('language', 'en-US');
  private handleError() {
    return (error: any) => {
      return throwError(() => error);
    };
  }
  constructor(private http: HttpClient) {}
  getPopularPeople(page: number): Observable<PeopleResponse> {
    return this.http
      .get<PeopleResponse>(`${environment.baseUrlMovie}person/popular`, {
        ...this.options,
        params: this.langParam.set('page', page),
      })
      .pipe(catchError(this.handleError()));
  }
  getPeopleDetail(id: string | null): Observable<PersonDetail> {
    return this.http
      .get<PersonDetail>(`${environment.baseUrlMovie}person/${id}`, {
        ...this.options,
        params: this.langParam,
      })
      .pipe(catchError(this.handleError()));
  }
}
