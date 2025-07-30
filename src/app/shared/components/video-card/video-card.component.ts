import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../../features/film/services/movie.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit {
  @Input() videoId!: string;
  @Input() media!: any;
  trailerKey!: string;
  isTrailerModalOpen: boolean = false;
  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  getYoutubeThumbnail(): string {
    if (this.media.type === 'video') {
      return `https://img.youtube.com/vi/${this.media.key}/hqdefault.jpg`;
    } else {
      // console.log('path', this.media.file_path);
      return this.media.file_path;
    }
  }
  onClickGetTrailer(id: string) {
    this.trailerKey = id;
    this.isTrailerModalOpen = true;
  }
}
