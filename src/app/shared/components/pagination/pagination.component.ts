import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage!: number ;
  @Input() totalPages!: number;

  @Output() pageChange = new EventEmitter<number>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  pageList: (number | string)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage'] || changes['totalPages']) {
      this.pageList = this.generatePageList(this.currentPage, this.totalPages);
    }
  }

  generatePageList(current: number, last: number): (number | string)[] {
    const delta = 1;
    const left = current - delta;
    const right = current + delta + 1;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  onPageClick(page: number | string) {
    if (typeof page === 'number') {
      this.pageChange.emit(page);
    }
  }

  onPrevClick() {
    if (this.currentPage > 1) {
      this.prev.emit();
    }
  }

  onNextClick() {
    if (this.currentPage < this.totalPages) {
      this.next.emit();
    }
  }
}
