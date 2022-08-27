import {Offer} from '../types/offer';
import {Comment} from '../types/comment';

export const makeFakeOffer = (): Offer => ({
  bedrooms: 3,
  city: {
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 10
    },
    name: 'Amsterdam'
  },
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: [
    'Heating'
  ],
  host: {
    avatarUrl: 'img/1.png',
    id: 1,
    isPro: true,
    name: 'Angelina'
  },
  id: 1,
  images: [
    'img/1.png'
  ],
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 10
  },
  maxAdults: 4,
  previewImage: 'img/1.png',
  price: 120,
  rating: 4.8,
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment'
} as Offer);

export const makeFakeComment = (): Comment => ({
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  date: 'Sat Aug 20 2022 22:29:10 GMT+0300 (Москва, стандартное время)',
  id: 1,
  rating: 4,
  user: {
    avatarUrl: 'img/1.png',
    id: 1,
    isPro: false,
    name: 'Oliver.conner'
  }
} as Comment);
