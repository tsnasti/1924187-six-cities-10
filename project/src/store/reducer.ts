import {createReducer} from '@reduxjs/toolkit';
import {CITES} from '../const';
import {offers} from '../mocks/offers';
import {chooseCity} from './action';

const initialState = {
  city: CITES.PARIS,
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      state.city = action.payload.city;
    });
});

export {reducer};
