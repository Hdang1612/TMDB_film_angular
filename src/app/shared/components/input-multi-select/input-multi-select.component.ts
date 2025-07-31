import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-multi-select',
  templateUrl: './input-multi-select.component.html',
  styleUrls: ['./input-multi-select.component.scss'],
})
export class InputMultiSelectComponent implements OnInit {
  constructor() {}
  @Input() item: any;
  @Input() group!: FormGroup;
  @Output() genreToggled = new EventEmitter<{ name: string; value: string }>();

  onToggle(value: string) {
    this.genreToggled.emit({ name: this.item.name, value });
  }
  ngOnInit(): void {}
}
