import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-feedback',
  templateUrl: './action-feedback.component.html',
  styleUrls: ['./action-feedback.component.scss'],
})
export class ActionFeedbackComponent implements OnInit {
  @Input() message: string = '';
  @Input() visible: boolean = false;

  hideMessage() {
    this.visible = false;
  }
  constructor() {}

  ngOnInit(): void {}
}
