import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-bar',
  templateUrl: './editor-bar.component.html',
  styleUrls: ['./editor-bar.component.scss'],
})
export class EditorBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() value = 0;
  @Input() max = 100;
  @Input() gradient = 'linear-gradient(to right, #a8edea, #01f3b4)';

  getPercentage(value: number, max: number): number {
    return (value / max) * 100;
  }
}
