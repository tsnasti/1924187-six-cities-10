import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {Comment} from '../types/comment';
import {AppRoute, AuthorizationStatus} from '../const';

export const chooseCity = createAction('main/chooseCity', (value) => ({
  payload: value
}));

export const sorting = createAction('main/sorting', (value) => ({
  payload: value
}));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOffer = createAction<Offer>('data/loadOffer');

export const loadNearbyOffers = createAction<Offer[]>('data/loadNearbyOffers');

export const loadComments = createAction<Comment[]>('data/loadComments');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');
