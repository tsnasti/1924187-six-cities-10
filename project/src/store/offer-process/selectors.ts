import {createSelector} from 'reselect';
import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {SORT} from '../../const';
import {sortLowPrice, sortHighPrice, sortRating} from '../../utils';
import {getOffers} from '../../store/offers-data/selectors';

export const getCity = (state: State): string => state[NameSpace.Offers].city;
export const getSorting = (state: State): string => state[NameSpace.Offers].sortItem;

export const getSortedOffers = createSelector(
  getSorting,
  getCity,
  getOffers,
  (sortItem, city, offers) => {
    const sortedOffers = [...offers];
    switch (sortItem) {
      case SORT.LOW_PRICE: {
        sortedOffers.sort(sortLowPrice);
        break;
      }
      case SORT.HIGH_PRICE: {
        sortedOffers.sort(sortHighPrice);
        break;
      }
      case SORT.TOP_RATED: {
        sortedOffers.sort(sortRating);
        break;
      }
    }
    return sortedOffers.filter((offer) => offer.city.name === city);
  }
);
