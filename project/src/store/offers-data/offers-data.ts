import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersData} from '../../types/state';
import {fetchOffersAction, fetchOfferAction, fetchNearbyOffer, fetchCommentsAction, addCommentAction, fetchFavoritesAction, addFavoriteAction} from '../api-actions';

export const initialState: OffersData = {
  offers: [],
  isDataLoaded: false,
  offer: undefined,
  nearbyOffers: [],
  comments: [],
  favoritesOffers: [],
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(fetchNearbyOffer.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoritesOffers = action.payload;
      })
      .addCase(addFavoriteAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite === true) {
          state.favoritesOffers = [...state.favoritesOffers, action.payload];
        } else {
          state.favoritesOffers = state.favoritesOffers.filter(({id}) => id !== action.payload.id);
        }
        state.offers = state.offers.map((offer) => offer.id === action.payload.id ? {...offer, isFavorite: action.payload.isFavorite} : offer);
      });
  }
});
