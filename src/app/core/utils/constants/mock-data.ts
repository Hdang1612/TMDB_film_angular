import { SectionModel, SubInfoSidebarConfig } from 'src/app/core/model/section';
import { TrendingFilm } from '../../model/trendingMovie';
import { MovieDetail } from 'src/app/core/model/movieDetail';

export const FOOTER_NAVS = [
  {
    title: 'Home',
    items: ['Categories', 'Devices', 'Pricing', 'FAQ'],
  },
  {
    title: 'Movies',
    items: ['Genres', 'Trending', 'New Release', 'Popular'],
  },
  {
    title: 'Shows',
    items: ['Genres', 'Trending', 'New Release', 'Popular'],
  },
  {
    title: 'Support',
    items: ['Contact Us'],
  },
  {
    title: 'Subscription',
    items: ['Plans', 'Features'],
  },
  {
    title: 'Connect With Us',
    icons: [
      { name: 'facebook', iconClass: 'assets/icons/social-fb.svg' },
      { name: 'twitter', iconClass: 'assets/icons/social-X.svg' },
      { name: 'linkedin', iconClass: 'assets/icons/social-linkedin.svg' },
    ],
  },
];
export const MOVIE_TYPE_MAP: Record<string, { type: string; title: string }> = {
  '': { type: 'popular', title: 'Popular' },
  upcoming: { type: 'upcoming', title: 'UpComing ' },
  'top-rated': { type: 'top_rated', title: 'Top Rated ' },
  'now-playing': { type: 'now_playing', title: 'Now Playing' },
};
export const TV_SHOW_TYPE_MAP: Record<string, { type: string; title: string }> =
  {
    '': { type: 'popular', title: 'Popular Movies' },
    upcoming: { type: 'upcoming', title: 'UpComing Movie' },
    'top-rated': { type: 'top_rated', title: 'Top rated Movies' },
    'now-playing': { type: 'now_playing', title: 'Now Playing' },
  };

export const HOME_SECTIONS: SectionModel[] = [
  {
    key: 'trending',
    title: 'Trending',
    btnGroup: [
      { label: 'Today', value: 'day' },
      { label: 'This Week', value: 'week' },
    ],
    data: [],
    dataType: 'default',

    subNav: '',
    subUrl: '',
  },
  {
    key: 'trailer',
    title: 'Lastest Trailer',
    btnGroup: [
      { label: 'Popular', value: 'popular' },
      { label: 'Intheater', value: 'intheater' },
    ],
    data: [],
    dataType: 'trailer',

    subNav: '',
    subUrl: '',
  },
  {
    key: 'popular',
    title: `What's popular`,
    btnGroup: [
      { label: 'Today', value: 'today' },
      { label: 'This Week', value: 'week' },
    ],
    data: [],
    dataType: 'default',

    subNav: '',
    subUrl: '',
  },
];
export const DETAIL_SECTIONS: SectionModel[] = [
  {
    key: 'cast',
    title: 'Series Cast',
    btnGroup: [],
    data: [],
    dataType: 'cast',

    subNav: 'Full Cast & Crew',
    subUrl: '',
  },
  {
    key: 'season',
    title: 'Current Season',
    btnGroup: [],
    data: [],
    dataType: 'season',
    subNav: 'View all season',
    subUrl: '',
  },
  {
    key: 'social',
    title: `Social`,
    btnGroup: [
      { label: 'Review', value: 'review' },
      { label: 'Discussion', value: 'discussion' },
    ],
    data: [],
    dataType: 'social',

    subNav: 'View all review',
    subUrl: '',
  },
  {
    key: 'media',
    title: `Media`,
    btnGroup: [
      { label: 'Most Popular', value: 'popular' },
      { label: 'Video', value: 'video' },
      { label: 'Backdrop', value: 'backdrop' },
      { label: 'Poster', value: 'poster' },
    ],
    data: [],
    dataType: 'media',

    subNav: '',
    subUrl: '',
  },
  {
    key: 'recommend',
    title: `Recommendations`,
    btnGroup: [],
    data: [],
    dataType: 'recommendation',

    subNav: '',
    subUrl: '',
  },
];

export const PEOPLE_DETAIL_SECTIONS: SectionModel[] = [
  {
    key: 'bio',
    title: 'Biography',
    btnGroup: [],
    data: [],
    dataType: 'text',
    subNav: '',
    subUrl: '',
  },
  {
    key: 'know-for',
    title: 'Know For',
    btnGroup: [],
    data: [],
    dataType: 'default',
    subNav: '',
    subUrl: '',
  },
  {
    key: 'acting',
    title: 'Acting',
    btnGroup: [],
    data: [],
    dataType: 'default',
    subNav: '',
    subUrl: '',
  },
];

export const SOCIAL_ICON_MAP = [
  {
    key: 'facebook_id',
    baseUrl: 'https://www.facebook.com/',
    iconPath: 'assets/icons/social-fb.svg',
  },
  {
    key: 'instagram_id',
    baseUrl: 'https://www.instagram.com/',
    iconPath: 'assets/icons/social-insta.svg',
  },
  {
    key: 'twitter_id',
    baseUrl: 'https://twitter.com/',
    iconPath: 'assets/icons/social-X.svg',
  },
];

export const FILTER_SECTIONS = [
  {
    title: 'Sort',
    icon: 'assets/icons/arrow-down.svg',
    content: [
      {
        type: 'select',
        label: 'Sort Results By',
        name: 'sort_by',
        defaultValue: 'popularity.desc',
        options: [
          { label: 'Popularity Descending', value: 'popularity.desc' },
          { label: 'Popularity Ascending', value: 'popularity.asc' },
          { label: 'Rating Descending', value: 'vote_average.desc' },
          { label: 'Rating Ascending', value: 'vote_average.asc' },
          { label: 'Release Date Descending', value: 'release_date.desc' },
          { label: 'Release Date Ascending', value: 'release_date.asc' },
        ],
      },
    ],
  },
  {
    title: 'Filters',
    icon: 'assets/icons/arrow-down.svg',
    content: [
      {
        type: 'radio',
        label: 'Show Me',
        name: 'watch_status',
        defaultValue: 'all',
        options: [
          { label: 'Everything', value: 'all' },
          { label: "Movies I Haven't Seen", value: 'not_seen' },
          { label: 'Movies I Have Seen', value: 'seen' },
        ],
      },
      {
        type: 'date-range',
        label: 'Release Dates',
        name: 'release_date',
        searchAll: true,
      },
      {
        type: 'multi-select',
        label: 'Genres',
        name: 'with_genres',
        defaultValue: [],
        options: [],
      },
      {
        type: 'select',
        label: 'Language',
        name: 'lang',
        defaultValue: '',
        options: [],
      },
    ],
  },
];

export const leaderboardMockData = [
  {
    id: 1,
    username: 'Shei',
    avatarUrl: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    allTimeEdits: 1901701,
    weeklyEdits: 11720,
    initials: 'S',
    color: '#f0c419',
  },
  {
    id: 2,
    username: 'bayramova',
    allTimeEdits: 300449,
    weeklyEdits: 8345,
    initials: 'B',
    color: '#888888',
  },
  {
    id: 3,
    username: 'zoulnix',
    avatarUrl: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    allTimeEdits: 103625,
    weeklyEdits: 7167,
    initials: 'Z',
    color: '#ccc',
  },
  {
    id: 4,
    username: 'vaugouin',
    allTimeEdits: 463727,
    avatarUrl: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    weeklyEdits: 6309,
    initials: 'V',
    color: '#c1bcbc',
  },
  {
    id: 5,
    username: 'hung0733',
    allTimeEdits: 29224,
    weeklyEdits: 5491,
    initials: 'H',
    color: '#e6007a',
  },
  {
    id: 6,
    username: 'enterpr1se',
    avatarUrl: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    allTimeEdits: 529301,
    weeklyEdits: 10759,
    initials: 'E',
    color: '#111',
  },
  {
    id: 7,
    username: 'janar',
    avatarUrl: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    allTimeEdits: 418550,
    weeklyEdits: 7758,
    initials: 'J',
    color: '#ddc34a',
  },
  {
    id: 8,
    username: 'raze464',
    avatarUrl: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    allTimeEdits: 1087743,
    weeklyEdits: 6431,
    initials: 'R',
    color: '#c33',
  },
  {
    id: 9,
    username: 'HeelerCattle86',
    avatarUrl: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    allTimeEdits: 193747,
    weeklyEdits: 5624,
    initials: 'H',
    color: '#d37846',
  },
  {
    id: 10,
    username: 'CXC6000',
    allTimeEdits: 306265,
    avatarUrl: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    weeklyEdits: 4839,
    initials: 'C',
    color: '#c11244',
  },
];
