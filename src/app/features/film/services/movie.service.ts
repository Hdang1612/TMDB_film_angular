import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrendingFilmResponse } from '../models/trendingMovie';
import { MovieDetail } from '../models/movieDetail';
import { TMDBTrailer } from '../models/trailer';
import { CastResponse } from '../models/credit';

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

  //  getTrailerRaw(id: number) {
  //   return this.http.get<{ results: TMDBTrailer[] }>(
  //     `https://api.themoviedb.org/3/movie/${id}/videos?...`
  //   );
  // }
  getBestTrailerKey(id: number) {
    return this.getTrailer(id).pipe(
      map((res) => {
        const official = res.results.find(
          (video: TMDBTrailer) => video.name === 'Official Trailer'
        );
        const fallback = res.results.find(
          (video: TMDBTrailer) =>
            video.type === 'Trailer' && video.site === 'YouTube'
        );

        if (official) return official.key;
        if (fallback) return fallback.key;
        return null;
      })
    );
  }

  getDetail(id: string | null): Observable<MovieDetail> {
    return this.http
      .get<MovieDetail>(`${environment.baseUrlMovie}movie/${id}`, {
        ...this.options,
        params: new HttpParams().set('language', 'en-US'),
      })
      .pipe(catchError(this.handleError()));
  }


  getCredit(id: string | null): Observable<CastResponse> {
    return this.http
      .get<CastResponse>(`${environment.baseUrlMovie}movie/${id}/credits`, {
        ...this.options,
        params: new HttpParams().set('language', 'en-US'),
      })
      .pipe(catchError(this.handleError()));
  }
}
