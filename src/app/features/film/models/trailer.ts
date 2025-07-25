

export interface TMDBTrailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;          
  site: string;         
  size: number;         
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | string;
  official: boolean;
  published_at: string; 
  id: string;
}
