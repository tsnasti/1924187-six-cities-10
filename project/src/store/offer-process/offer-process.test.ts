import {offerProcess, chooseCity, sorting, initialState} from './offer-process';
import {CITIES, SORT} from '../../const';

describe('Reducer: offerProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(offerProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should get city', () => {
    expect(offerProcess.reducer(initialState, chooseCity(CITIES.PARIS)))
      .toEqual({...initialState, city: CITIES.PARIS});
  });

  it('should get sorting value', () => {
    expect(offerProcess.reducer(initialState, sorting(SORT.POPULAR)))
      .toEqual({...initialState, sortItem: SORT.POPULAR});
  });
});
