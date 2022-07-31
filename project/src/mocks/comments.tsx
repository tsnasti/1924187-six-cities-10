import {Comment} from '../types/comment';
import {Rating} from '../const';

export const comments: Comment[] = [
  {
    rewiew: 'Cool place for long stay',
    date: 'Sun Jul 31 2022 14:07:19 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: Rating.Four,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: false,
      name: 'Angelina',
    }
  },

  {
    rewiew: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Sun Jul 31 2022 14:07:19 GMT+0300 (Москва, стандартное время)',
    id: 2,
    rating: Rating.Two,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: false,
      name: 'Richard',
    }
  },
];
