import {Host} from './offer';

export type CommentData = {
  hotelId: number | undefined;
  comment: string;
  rating: number | null;
}

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Host;
}
