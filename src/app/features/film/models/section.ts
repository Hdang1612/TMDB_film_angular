export interface SectionModel {
  key: string;
  title: string;
  btnGroup: SectionBtn[];
  dataType: any;
  data: any[];
  subNav: string;
}

export interface SectionBtn {
  label: string;
  value: string;
}
