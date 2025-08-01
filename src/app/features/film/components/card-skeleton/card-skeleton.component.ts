import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  templateUrl: './card-skeleton.component.html',
  styleUrls: ['./card-skeleton.component.scss'],
})
export class CardSkeletonComponent implements OnInit {
  @Input() cardType: 'default' | 'trailer' | 'recommendation' | 'cast' =
    'default';
  constructor() {}

  ngOnInit(): void {}
}
