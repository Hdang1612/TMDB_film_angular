import { Component, Input, OnInit } from '@angular/core';
import { GlobalFeedbackService } from 'src/app/core/services/feedback.service';

@Component({
  selector: 'app-action-feedback',
  templateUrl: './action-feedback.component.html',
  styleUrls: ['./action-feedback.component.scss'],
})
export class ActionFeedbackComponent implements OnInit {
  message = '';
  type: 'success' | 'error' | 'info' = 'success';
  visible = false;
  timeoutRef: any; // cleat timeout khi có message mới 

  constructor(private feedbackService: GlobalFeedbackService) {}

  ngOnInit(): void {
    this.feedbackService.message$.subscribe(({ message, type }) => {
      this.message = message;
      this.type = type;
      this.visible = true;

      clearTimeout(this.timeoutRef);
      this.timeoutRef = setTimeout(() => (this.visible = false), 2000);
    });
  }

  close() {
    this.visible = false;
    clearTimeout(this.timeoutRef);
  }
}
