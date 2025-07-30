import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionModel } from '../../models/section';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.scss'],
})
export class PageSectionComponent implements OnInit {
  @Output() btnClick = new EventEmitter<string>();
  @Input() isLoading: boolean | null = null;
  @Input() section: SectionModel = {
    key: '',
    title: '',
    btnGroup: [],
    dataType: '',
    data: [],
    subNav: '',
    subUrl: '',
  };
  activeBtnIndex: number = 0;
  selectedMenuCardId: number | null = null;
  id: string = '';

  constructor(private route: ActivatedRoute) {}
  onClickBtn(index: number) {
    this.activeBtnIndex = index;
    this.btnClick.emit(this.section.btnGroup[index].value);
    // console.log('>>>', this.section.data);
  }
  handleOpenMenu(id: number) {
    this.selectedMenuCardId = this.selectedMenuCardId === id ? null : id;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
    });
  }
}
