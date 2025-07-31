import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
})
export class InputRadioComponent implements OnInit {
  @Input() item: any;
  @Input() group!: FormGroup ;
  constructor() {}

  ngOnInit(): void {}
}
