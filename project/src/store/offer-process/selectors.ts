import {createSelector} from 'reselect';
import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {SORT} from '../../const';
import {sortLowPrice, sortHighPrice, sortRating} from '../../utils';

export const getCity = createSelector(
  (state: State) => state,
  (state: State) => {
    const activeCity = state[NameSpace.Offers].city;
    return activeCity;
  }
);

export const getSorting = createSelector(
  (state: State) => state,
  (state: State) => {
    const sortItem = state[NameSpace.Offers].sortItem;
    return sortItem;
  }
);

export const sortedOffers = createSelector(
  (state: State) => state,
  (state: State) => {
    const sortItem = state[NameSpace.Offers].sortItem;
    const offers = state[NameSpace.Data].offers;
    switch (sortItem) {
      case SORT.LOW_PRICE: {
        offers.sort(sortLowPrice);
        break;
      }
      case SORT.HIGH_PRICE: {
        offers.sort(sortHighPrice);
        break;
      }
      case SORT.TOP_RATED: {
        offers.sort(sortRating);
        break;
      }
    }
    return offers;
  }
);
