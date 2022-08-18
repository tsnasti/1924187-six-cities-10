import {store} from '../store/index.js';
import {AuthorizationStatus} from '../const';
import {Offer} from './offer';
import {Comment} from './comment';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type OffersData = {
  offers: Offer[],
  isDataLoaded: boolean,
  offer: Offer | undefined,
  nearbyOffers: Offer[],
  comments: Comment [],
  favoritesOffers: Offer[] | [],
};

export type OfferProcess = {
  city: string,
  sortItem: string,
};
