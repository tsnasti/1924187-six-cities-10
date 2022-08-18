export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  location: Location;
  name: string;
}

export type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type FavoriteOfferData = {
  hotelId: number | undefined;
  status: number;
}

export type Offer = {
  city: City;
  id: number;
  description: string;
  title: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  price: number;
  type: string;
  isFavorite: boolean;
  location: Location;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: Host;
};
