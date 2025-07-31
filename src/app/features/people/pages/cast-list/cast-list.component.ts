import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from 'src/app/core/model/credit';
import { getFullImageUrl } from 'src/app/core/utils/img.utils';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss'],
})
export class CastListComponent implements OnInit {
  constructor(private personSerVice: PersonService) {}
  result!: Person[];
  currentPage: number = 1;
  totalPages: number = 0;
  ngOnInit(): void {
    this.getListPerson(1);
  }
  getListPerson(page: number) {
    this.personSerVice.getPopularPeople(page).subscribe({
      next: (res) => {
        this.result = res.results.map((item) => ({
          ...item,
          profile_path: getFullImageUrl(item.profile_path),
          list_film: item.known_for.map((item) => item.title).join(' , '),
        }));
        this.totalPages = res.total_pages;
        console.log('people', this.result);
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }
  paginate(page: number) {
    this.currentPage = page;
    this.getListPerson(page);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getListPerson(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getListPerson(this.currentPage);
    }
  }
}
