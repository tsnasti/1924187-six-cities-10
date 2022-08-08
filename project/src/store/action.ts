import {createAction} from '@reduxjs/toolkit';

export const chooseCity = createAction('main/chooseCity', (value) => ({
  payload: value
}));

export const sorting = createAction('main/sorting', (value) => ({
  payload: value
}));
