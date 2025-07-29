import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();
  constructor() {}
  show() {
    console.log('loading ');
    this._loading.next(true);
  }
  hide() {
    console.log('unloading ');
    this._loading.next(false);
  }
}
