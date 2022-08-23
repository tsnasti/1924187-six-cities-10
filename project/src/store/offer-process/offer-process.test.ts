import {offerProcess, chooseCity, sorting, initialState} from './offer-process';
import {CITES, SORT} from '../../const';

describe('Reducer: offerProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(offerProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should get city', () => {
    expect(offerProcess.reducer(initialState, chooseCity(CITES.PARIS)))
      .toEqual({...initialState, city: CITES.PARIS});
  });

  it('should get sorting value', () => {
    expect(offerProcess.reducer(initialState, sorting(SORT.POPULAR)))
      .toEqual({...initialState, sortItem: SORT.POPULAR});
  });
});
