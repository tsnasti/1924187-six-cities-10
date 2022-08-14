import {createReducer} from '@reduxjs/toolkit';
import {CITES, SORT, AuthorizationStatus} from '../const';
import {Offer} from '../types/offer';
import {Comment} from '../types/comment';
import {chooseCity, sorting, loadOffers, loadOffer, loadNearbyOffers, requireAuthorization, setDataLoadedStatus, loadComments} from './action';

type InitalState = {
  city: string,
  offers: Offer[],
  offer: Offer | undefined,
  nearbyOffers: Offer[],
  comments: Comment[],
  sortItem: string,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};

const initialState: InitalState = {
  city: CITES.PARIS,
  offers: [],
  offer: undefined,
  nearbyOffers: [],
  comments: [],
  sortItem: SORT.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(sorting, (state, action) => {
      state.sortItem = action.payload.sortItem;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
