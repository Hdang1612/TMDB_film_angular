import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss'],
})
export class ProfileLayoutComponent implements OnInit {
  constructor() {}
  profile: any;
  ngOnInit(): void {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      this.profile = JSON.parse(stored);
    }
    console.log(this.profile);
  }
}
