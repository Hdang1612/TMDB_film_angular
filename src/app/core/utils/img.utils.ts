import { environment } from 'src/environments/environment';
import { SOCIAL_ICON_MAP } from './constants/mock-data';
export function getFullImageUrl(
  path: string | null,
  size: string = 'w500'
): string {
  return path
    ? `${environment.baseUrlImg}${size}${path}`
    : 'assets/images/fallback.png';
}

export function loadSocialLinks(socialData: any) {
  const socialLinks = SOCIAL_ICON_MAP.filter(
    (item) => socialData[item.key]
  ).map((item) => ({
    icon: item.iconPath,
    url: item.baseUrl + socialData[item.key],
  }));

  return socialLinks;
}
