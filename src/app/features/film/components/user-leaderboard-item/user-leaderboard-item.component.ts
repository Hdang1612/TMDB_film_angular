import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-leaderboard-item',
  templateUrl: './user-leaderboard-item.component.html',
  styleUrls: ['./user-leaderboard-item.component.scss'],
})
export class UserLeaderboardItemComponent implements OnInit {
  @Input() weekValue!: number;
  @Input() allTimeValue!: number;
  @Input() weekMax: number = 10000;
  @Input() allTimeMax: number = 1901701;
  @Input() editorName: string = '';
  constructor() {}

  ngOnInit(): void {}
}
