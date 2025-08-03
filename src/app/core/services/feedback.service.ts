// src/app/core/services/global-feedback.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type FeedbackType = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class GlobalFeedbackService {
   messageSubject = new Subject<{ message: string; type: FeedbackType }>();
   message$: Observable<{ message: string; type: FeedbackType }> = this.messageSubject.asObservable();

  show(message: string, type: FeedbackType = 'success') {
    this.messageSubject.next({ message, type });
  }
}
