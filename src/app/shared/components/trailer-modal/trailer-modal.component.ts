import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trailer-modal',
  templateUrl: './trailer-modal.component.html',
  styleUrls: ['./trailer-modal.component.scss'],
})
export class TrailerModalComponent implements OnChanges {
  @Input() isTrailerModalOpen: boolean = false;
  @Input() trailerKey!: string;
  @Output() close = new EventEmitter<void>();

  videoUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trailerKey'] && this.trailerKey) {
      const unsafeUrl = `${environment.baseUrlTrailer}${this.trailerKey}`;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      console.log('Safe video URL:', this.videoUrl);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
