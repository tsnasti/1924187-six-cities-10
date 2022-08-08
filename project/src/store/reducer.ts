import {createReducer} from '@reduxjs/toolkit';
import {CITES, SORT} from '../const';
import {offers} from '../mocks/offers';
import {chooseCity, sorting} from './action';

const initialState = {
  city: CITES.PARIS,
  offers: offers,
  sortItem: SORT.POPULAR,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(sorting, (state, action) => {
      state.sortItem = action.payload.sortItem;
    });
});

export {reducer};
