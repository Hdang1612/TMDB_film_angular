import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PersonDetail } from 'src/app/core/model/credit';
import { HttpParams } from '@angular/common/http';
import { SubInfoSidebarConfig } from 'src/app/core/model/section';
import { calculateAge } from 'src/app/core/utils/age.utils';
import { getFullImageUrl, loadSocialLinks } from 'src/app/core/utils/img.utils';
import { TrendingFilm } from 'src/app/core/model/trendingMovie';
import { PEOPLE_DETAIL_SECTIONS } from 'src/app/core/utils/constants/mock-data';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss'],
})
export class PeopleDetailComponent implements OnInit {
  detail!: PersonDetail;
  subInfoSidebarConfig!: SubInfoSidebarConfig;
  movies!: TrendingFilm[];
  detailSection = PEOPLE_DETAIL_SECTIONS;
  constructor(
    private peopleService: PersonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.loadDetail(id);
    });
  }

  loadDetail(id: string | null) {
    this.peopleService.getPeopleDetail(id).subscribe({
      next: (res) => {
        this.detail = {
          ...res,
          profile_path: getFullImageUrl(res.profile_path),
        };
        console.log('detail', this.detail);
        this.subInfoSidebarConfig = {
          image: this.detail.profile_path,
          socialLinks: [],
          items: [
            { label: 'Known For', value: this.detail.known_for_department },
            { label: 'Known Credits', value: this.movies?.length },
            {
              label: 'Gender',
              value: this.detail.gender === 1 ? 'Female' : 'Male',
            },
            {
              label: 'Birthday',
              value: this.detail.birthday
                ? `${this.detail.birthday} (${calculateAge(
                    this.detail.birthday
                  )} years old)`
                : 'N/A',
            },
            { label: 'Place of Birth', value: this.detail.place_of_birth },
          ],
          keywords: this.detail.also_known_as || [],
        };
        this.loadPeopleMovie(id);
        this.loadSocialIcon(id);
        const section = this.detailSection.find((s) => s.key === 'bio');
        if (section) section.data[0] = this.detail.biography;
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }

  loadSocialIcon(id: string | null) {
    this.peopleService.getPeopleSocial(id).subscribe({
      next: (res) => {
        const map = loadSocialLinks(res);
        console.log(map);
        this.subInfoSidebarConfig.socialLinks = map;
      },
      error: (err) => {
        alert(err.error?.error);
      },
    });
  }
  loadPeopleMovie(id: string | null) {
    this.peopleService.getPeopleMovie(id).subscribe({
      next: (res) => {
        console.log('>>', res);
        const mapped = res.cast.map((item: TrendingFilm) => ({
          ...item,
          poster_path: getFullImageUrl(item.poster_path),
        }));
        const section = this.detailSection.find((s) => s.key === 'know-for');
        if (section) section.data = mapped;
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }
}
