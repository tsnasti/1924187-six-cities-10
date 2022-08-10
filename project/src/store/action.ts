import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AuthorizationStatus} from '../const';

export const chooseCity = createAction('main/chooseCity', (value) => ({
  payload: value
}));

export const sorting = createAction('main/sorting', (value) => ({
  payload: value
}));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('main/setError');

