export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  location: Location;
  name: string;
}

export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Offer = {
  city: City;
  id: number;
  description: string;
  title: string;
  photoPreview: string;
  photos: string[];
  isPremium: boolean;
  price: number;
  type: string;
  isFavorite: boolean;
  location: Location;
  rating: number;
  roomCount: number;
  peopleCount: number;
  facilities: string[];
  user: User;
};
