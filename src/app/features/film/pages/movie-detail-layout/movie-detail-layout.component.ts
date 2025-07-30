import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail-layout',
  templateUrl: './movie-detail-layout.component.html',
  styleUrls: ['./movie-detail-layout.component.scss'],
})
export class MovieDetailLayoutComponent implements OnInit {
  id!: string | null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }
}
