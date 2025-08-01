import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingMap = new Map<string, BehaviorSubject<boolean>>();

  setLoading(key: string, value: boolean): void {
    if (!this.loadingMap.has(key)) {
      this.loadingMap.set(key, new BehaviorSubject<boolean>(value));
    } else {
      this.loadingMap.get(key)!.next(value);
    }
  }

  isLoading(key: string): Observable<boolean> {
    if (!this.loadingMap.has(key)) {
      this.loadingMap.set(key, new BehaviorSubject<boolean>(false));
    }
    return this.loadingMap.get(key)!.asObservable();
  }
}
