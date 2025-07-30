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

export interface SubInfoItem {
  label: string;
  value: any;
  isCurrency?: boolean;
  // isLanguage?: boolean;
  isKeywordList?: boolean;
}
export interface SocialLink {
  icon: string;
  url: string;
}

export interface SubInfoSidebarConfig {
  title?: string;
  socialLinks?: SocialLink[];
  items: SubInfoItem[];
}
