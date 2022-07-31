import {Offer} from '../types/offer';
import {Rating} from '../const';

export const offers: Offer[] = [
  {
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam',
    },
    id: 1,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    title: 'Luxurious apartment at great location',
    photoPreview: 'img/apartment-01.jpg',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    photos: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    isPremium: true,
    price: 1500,
    type: 'Apartment',
    isFavorite: true,
    rating: Rating.Four,
    roomCount: 3,
    peopleCount: 3,
    facilities: ['Wi-Fi, Washing machine, Towels, Heating'],
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: true,
      name: 'Angelina'
    }
  },

  {
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Paris',
    },
    id: 2,
    description: 'A quiet cozy room next to the Eiffel Tower',
    title: 'Wood and stone place',
    photoPreview: 'img/room.jpg',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    photos: ['img/studio-01.jpg', 'img/studio-02.jpg', 'img/studio-03.jpg'],
    isPremium: false,
    price: 140,
    type: 'Private room',
    isFavorite: false,
    rating: Rating.Two,
    roomCount: 1,
    peopleCount: 2,
    facilities: ['Wi-Fi'],
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 2,
      isPro: false,
      name: 'Richard'
    }
  },
];
