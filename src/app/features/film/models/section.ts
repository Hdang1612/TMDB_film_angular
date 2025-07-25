export interface SectionModel {
  key: string;
  title: string;
  btnGroup: SectionBtn[];
  isMovieHorizontal: boolean;
  isRecommendation: boolean;
  data: any[];
  subNav: string;
}

export interface SectionBtn {
  label: string;
  value: string;
}
