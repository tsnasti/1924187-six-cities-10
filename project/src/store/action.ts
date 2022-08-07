import {createAction} from '@reduxjs/toolkit';

export const chooseCity = createAction('main/chooseCity', (value) => ({
  payload: value
}));
