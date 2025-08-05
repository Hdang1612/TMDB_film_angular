import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FILTER_SECTIONS } from 'src/app/core/utils/constants/mock-data';
import { MovieService } from 'src/app/features/film/services/movie.service';
import { TvService } from 'src/app/features/tv/services/movie.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  filterSections = FILTER_SECTIONS.map((item) => ({
    ...item,
    isOpen: true,
  }));
  filterForm!: FormGroup;
  @Input() mediaType: 'movie' | 'tv' = 'movie';
  @Output() searchResult = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private datePipe: DatePipe,
    private tvService: TvService
  ) {}
  private get currentService() {
    return this.mediaType === 'movie' ? this.movieService : this.tvService;
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({});
    this.loadListGenres();
    this.loadListLanguage();
    this.filterSections.forEach((section) => {
      section.content.forEach((item) => {
        switch (item.type) {
          case 'select':
            this.filterForm.addControl(
              item.name,
              new FormControl(
                item.defaultValue ||
                  (item.options?.length ? item.options[0].value : '')
              )
            );
            break;
          case 'radio':
            this.filterForm.addControl(
              item.name,
              new FormControl(item.defaultValue || '')
            );
            break;
          case 'input':
            this.filterForm.addControl(item.name, new FormControl(''));
            break;
          case 'date-range':
            this.filterForm.addControl(
              item.name,
              this.fb.group({
                from: [''],
                to: [''],
                searchAll: [item.searchAll || false],
              })
            );
            break;
          case 'multi-select':
            this.filterForm.addControl(item.name, new FormControl([]));
            break;
        }
      });
    });
  }
  toggleSection(section: any) {
    section.isOpen = !section.isOpen;
  }
  onSearch() {
    const rawValue = this.filterForm.value;
    console.log('param', rawValue);
    const params: any = {};

    for (const key in rawValue) {
      const value = rawValue[key];
      if (
        value &&
        typeof value === 'object' &&
        'from' in value &&
        'to' in value
      ) {
        if (!value.searchAll) {
          if (value.from) {
            const fromDate = this.datePipe.transform(value.from, 'yyyy-MM-dd');
            if (fromDate) params['primary_release_date.gte'] = fromDate;
          }
          if (value.to) {
            const toDate = this.datePipe.transform(value.to, 'yyyy-MM-dd');
            if (toDate) params['primary_release_date.lte'] = toDate;
          }
        }
      } else if (Array.isArray(value)) {
        if (key === 'with_genres' && value.length) {
          params[key] = value.join(',');
        }
      } else if (value !== null && value !== '') {
        params[key] = value;
      }
      console.log('parammm', params);
    }

    this.currentService.getDiscoveryMovies(params).subscribe({
      next: (res) => {
        this.searchResult.emit(res); //
      },
    });
  }

  toggleGenre(itemName: string, genre: string) {
    const genres: string[] = this.filterForm.get(itemName)?.value || [];
    const index = genres.indexOf(genre);
    if (index >= 0) {
      genres.splice(index, 1);
    } else {
      genres.push(genre);
    }
    this.filterForm.get(itemName)?.setValue(genres);
  }
  loadListLanguage() {
    this.currentService.getConfigure('languages').subscribe({
      next: (res) => {
        console.log('>>>>>', res);
        const langOption = res.map((g: any) => ({
          label: g.english_name,
          value: g.iso_639_1,
        }));

        this.filterSections.forEach((section) => {
          section.content.forEach((item) => {
            if (item.name === 'lang') {
              item.options = langOption;
            }
          });
        });
        console.log('>>', this.filterSections);
      },
    });
  }
  loadListGenres() {
    this.currentService.getGenres().subscribe({
      next: (res) => {
        const genreOptions = res.genres.map((g: any) => ({
          label: g.name,
          value: g.id.toString(),
        }));

        this.filterSections.forEach((section) => {
          section.content.forEach((item) => {
            if (item.name === 'with_genres' && item.type === 'multi-select') {
              item.options = genreOptions;
            }
          });
        });
        console.log('>>', this.filterSections);
      },
    });
  }
}
