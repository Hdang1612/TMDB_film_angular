import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'fullImageUrl',
})
export class FullImageUrlPipe implements PipeTransform {
  transform(path: string | null | undefined, size: string = 'w500'): string {
    return path
      ? `${environment.baseUrlImg}${size}${path}`
      : 'assets/images/fallback.png';
  }
}
