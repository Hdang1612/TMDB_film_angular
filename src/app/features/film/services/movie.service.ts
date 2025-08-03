import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrendingFilmResponse } from '../../../core/model/trendingMovie';
import {
  FavoriteReq,
  MovieDetail,
  MovieState,
  WatchListReq,
} from '../../../core/model/movieDetail';
import { TMDBTrailer } from '../models/trailer';
import { CastResponse } from '../../../core/model/credit';
import { RecommendationResponse } from '../models/recomendation';
import { ReviewResponse } from '../../../core/model/review';

@Injectable({ providedIn: 'root' })
export class MovieService {
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
  getTrendingList(time_window: string): Observable<TrendingFilmResponse> {
    return this.http
      .get<TrendingFilmResponse>(
        `${environment.baseUrlMovie}trending/movie/${time_window}`,
        {
          ...this.options,
          params: this.langParam,
          // .set('api_key', environment.apiKey),
        }
      )
      .pipe(catchError(this.handleError()));
  }

  getListMovie(page: number, type: string): Observable<TrendingFilmResponse> {
    return this.http.get<TrendingFilmResponse>(
      `${environment.baseUrlMovie}movie/${type}`,
      {
        ...this.options,
        params: this.langParam.set('page', page),
      }
    );
  }

  getTrailer(id: string | null): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrlMovie}movie/${id}/videos`, {
        ...this.options,
        params: new HttpParams().set('lang', 'en-US'),
      })
      .pipe(catchError(this.handleError()));
  }
  getImages(id: string | null): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrlMovie}movie/${id}/images`)
      .pipe(catchError(this.handleError()));
  }

  //  getTrailerRaw(id: number) {
  //   return this.http.get<{ results: TMDBTrailer[] }>(
  //     `https://api.themoviedb.org/3/movie/${id}/videos?...`
  //   );
  // }

  //get ra video official trailer
  getBestTrailerKey(id: string | null) {
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
        params: this.langParam,
      })
      .pipe(catchError(this.handleError()));
  }

  getCredit(id: string | null): Observable<CastResponse> {
    return this.http
      .get<CastResponse>(`${environment.baseUrlMovie}movie/${id}/credits`, {
        ...this.options,
        params: this.langParam,
      })
      .pipe(catchError(this.handleError()));
  }

  // recommendations
  getRecommendation(id: string | null): Observable<RecommendationResponse> {
    return this.http
      .get<RecommendationResponse>(
        `${environment.baseUrlMovie}movie/${id}/recommendations`,
        { ...this.options, params: this.langParam }
      )
      .pipe(catchError(this.handleError()));
  }

  // review
  getReviews(id: string | null, page: number): Observable<ReviewResponse> {
    return this.http
      .get<ReviewResponse>(`${environment.baseUrlMovie}movie/${id}/reviews`, {
        ...this.options,
        params: this.langParam.set('page', page),
      })
      .pipe(catchError(this.handleError()));
  }

  //genres
  getGenres(): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrlMovie}genre/movie/list`, {
        ...this.options,
        params: this.langParam,
      })
      .pipe(catchError(this.handleError()));
  }

  // get các kênh social
  getExternalId(id: string | null, type: string): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrlMovie}${type}/${id}/external_ids`, {
        ...this.options,
        params: this.langParam,
      })
      .pipe(catchError(this.handleError()));
  }

  getKeyword(id: string | null, type: string): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrlMovie}${type}/${id}/keywords`, {
        ...this.options,
        params: this.langParam,
      })
      .pipe(catchError(this.handleError()));
  }
  getConfigure(type: string | null): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrlMovie}configuration/${type}`, {
        ...this.options,
        params: this.langParam,
      })
      .pipe(catchError(this.handleError()));
  }

  getDiscoveryMovies(params: {
    sort_by?: string;
    with_genres?: string;
    'release_date.gte'?: string;
    'release_date.lte'?: string;
    page?: number;
    lang?: string;
    [key: string]: any;
  }): Observable<any> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.get(`${environment.baseUrlMovie}discover/movie`, {
      params: httpParams,
    });
  }

  //favorite & watchlist
  getFavorite(type: string, page: number): Observable<any> {
    return this.http
      .get<any>(
        `${environment.baseUrlMovie}account/${environment.accountId}/favorite/${type}`,
        {
          ...this.options,
          params: this.langParam.set('page', page),
        }
      )
      .pipe(catchError(this.handleError()));
  }
  updateFavorite(body: FavoriteReq): Observable<any> {
    return this.http
      .post<any>(
        `${environment.baseUrlMovie}account/${environment.accountId}/favorite`,
        body,
        {
          ...this.options,
          params: this.langParam,
        }
      )
      .pipe(catchError(this.handleError()));
  }

  getWatchList(type: string, page: number): Observable<any> {
    return this.http
      .get<any>(
        `${environment.baseUrlMovie}account/${environment.accountId}/watchlist/${type}`,
        {
          ...this.options,
          params: this.langParam.set('page', page),
        }
      )
      .pipe(catchError(this.handleError()));
  }

  updateWatchList(body: WatchListReq): Observable<any> {
    return this.http
      .post<any>(
        `${environment.baseUrlMovie}account/${environment.accountId}/watchlist`,
        body,
        {
          ...this.options,
          params: this.langParam,
        }
      )
      .pipe(catchError(this.handleError()));
  }

  getMovieState(id: string | null): Observable<MovieState> {
    return this.http
      .get<MovieState>(
        `${environment.baseUrlMovie}movie/${id}/account_states`,
        {
          ...this.options,
        }
      )
      .pipe(catchError(this.handleError()));
  }
}
