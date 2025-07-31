export interface SectionModel {
  key: string;
  title: string;
  btnGroup: SectionBtn[];
  dataType: any;
  data: any[];
  subNav: string;
  subUrl: string;
}

export interface SectionBtn {
  label: string;
  value: string;
}

export interface SubInfoItem {
  label: string;
  value: any;
  isCurrency?: boolean;
}
export interface SocialLink {
  icon: string;
  url: string;
}

export interface SubInfoSidebarConfig {
  image?: string | null;
  title?: string;
  socialLinks?: SocialLink[];
  keywords?: string[];
  items: SubInfoItem[];
}
