export interface CastResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  adult: boolean;
  gender: number; // 0: Unknown, 1: Female, 2: Male
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export const mockCast: CastMember[] = [
  {
    adult: false,
    gender: 2,
    id: 101,
    known_for_department: 'Acting',
    name: 'John Doe',
    original_name: 'John Doe',
    popularity: 8.5,
    profile_path: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    cast_id: 10,
    character: 'Hero',
    credit_id: 'abc123',
    order: 0,
  },
  {
    adult: false,
    gender: 1,
    id: 102,
    known_for_department: 'Acting',
    name: 'Jane Smith',
    original_name: 'Jane Smith',
    popularity: 7.3,
    profile_path: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    cast_id: 11,
    character: 'Heroine',
    credit_id: 'def456',
    order: 1,
  },
  {
    adult: false,
    gender: 2,
    id: 103,
    known_for_department: 'Acting',
    name: 'Bob Lee',
    original_name: 'Bob Lee',
    popularity: 6.9,
    profile_path: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    cast_id: 12,
    character: 'Villain',
    credit_id: 'ghi789',
    order: 2,
  },
  {
    adult: false,
    gender: 0,
    id: 104,
    known_for_department: 'Acting',
    name: 'Alex Unknown',
    original_name: 'Alex Unknown',
    popularity: 5.4,
    profile_path: 'assets/images/80b5d5c9724ee31a57bb49f721b164f6bc4f707f.png',
    cast_id: 13,
    character: 'Mysterious Stranger',
    credit_id: 'jkl012',
    order: 3,
  },
];
