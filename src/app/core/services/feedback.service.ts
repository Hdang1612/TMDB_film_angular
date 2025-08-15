// src/app/core/services/global-feedback.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({ providedIn: 'root' })
export class GlobalFeedbackService {
  constructor(private toastr: ToastrService) {}
  show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'success'
  ) {
    switch (type) {
      case 'success':
        this.toastr.success(message);
        break;
      case 'error':
        this.toastr.error(message);
        break;
      case 'info':
        this.toastr.info(message);
        break;
      case 'warning':
        this.toastr.warning(message);
        break;
    }
  }
}
