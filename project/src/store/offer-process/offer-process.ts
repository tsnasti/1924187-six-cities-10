import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, CITES, SORT} from '../../const';
import {OfferProcess} from '../../types/state';

export const initialState: OfferProcess = {
  city: CITES.PARIS,
  sortItem: SORT.POPULAR,
};

export const offerProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    chooseCity: (state, action) => {
      state.city = action.payload;
    },
    sorting: (state, action) => {
      state.sortItem = action.payload;
    }
  },
});

export const {chooseCity, sorting} = offerProcess.actions;
