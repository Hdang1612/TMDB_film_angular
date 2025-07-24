export interface TrendingFilmResponse {
  page: number;
  results: TrendingFilm[];
  total_pages: number;
  total_results: number;
}

export interface TrendingFilm {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: "movie" | "tv" | "person";
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
