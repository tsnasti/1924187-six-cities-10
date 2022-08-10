import {createReducer} from '@reduxjs/toolkit';
import {CITES, SORT, AuthorizationStatus} from '../const';
import {Offer} from '../types/offer';
import {chooseCity, sorting, loadOffers, requireAuthorization, setError, setDataLoadedStatus} from './action';

type InitalState = {
  city: string,
  offers: Offer[],
  sortItem: string,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string | null,
};

const initialState: InitalState = {
  city: CITES.PARIS,
  offers: [],
  sortItem: SORT.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: null,
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
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
