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
  ngOnInit(): void {
    this.getListPerson(1);
  }
  getListPerson(page: number) {
    this.personSerVice.getPopularPeople(page).subscribe({
      next: (res) => {
        this.result = res.results.map((item) => ({
          ...item,
          profile_path: getFullImageUrl(item.profile_path),
        }));
        console.log('people', this.result);
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }
}
