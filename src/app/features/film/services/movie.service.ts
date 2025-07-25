import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrendingFilmResponse } from '../models/trendingMovie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'api-key': environment.apiKey,
    }),
  };
  private handleError() {
    return (error: any) => {
      return throwError(() => error);
    };
  }
  constructor(private http: HttpClient) {}
  getTrendingList(time_window: string): Observable<TrendingFilmResponse> {
    return this.http
      .get<TrendingFilmResponse>(
        `${environment.baseUrlMovie}trending/movie/${time_window}`,
        {
          ...this.options,
          params: new HttpParams().set('language', 'en-US'),
          // .set('api_key', environment.apiKey),
        }
      )
      .pipe(catchError(this.handleError()));
  }
  getUpcomingList(page: number): Observable<TrendingFilmResponse> {
    return this.http
      .get<TrendingFilmResponse>(`${environment.baseUrlMovie}movie/upcoming`, {
        ...this.options,
        params: new HttpParams().set('lang', 'en-US').set('page', page),
      })
      .pipe(catchError(this.handleError()));
  }
  getPopularList(page: number): Observable<TrendingFilmResponse> {
    return this.http
      .get<TrendingFilmResponse>(`${environment.baseUrlMovie}movie/popular`, {
        ...this.options,
        params: new HttpParams().set('lang', 'en-US').set('page', page),
      })
      .pipe(catchError(this.handleError()));
  }

  getTrailer(id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrlMovie}movie/${id}/videos`, {
        ...this.options,
        params: new HttpParams().set('lang', 'en-US'),
      })
      .pipe(catchError(this.handleError()));
  }
}
