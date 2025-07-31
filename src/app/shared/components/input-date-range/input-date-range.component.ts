import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-date-range',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.scss'],
})
export class InputDateRangeComponent implements OnInit {
  @Input() item: any;
  @Input() group!: FormGroup;
  constructor() {}
  get subGroup(): FormGroup {
    return this.group.get(this.item.name) as FormGroup;
  }
  ngOnInit(): void {}
}
