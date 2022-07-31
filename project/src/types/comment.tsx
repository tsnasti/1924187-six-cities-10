import {User} from './offer';

export type Comment = {
  rewiew: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}
