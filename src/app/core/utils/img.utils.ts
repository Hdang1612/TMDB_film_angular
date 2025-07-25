import { environment } from 'src/environments/environment';
export function getFullImageUrl(
  path: string | null,
  size: string = 'w500'
): string {
  return path
    ? `${environment.baseUrlImg}${size}${path}`
    : 'assets/images/fallback.png';
}
