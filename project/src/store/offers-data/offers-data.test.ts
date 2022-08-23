import {offersData, initialState} from './offers-data';
import {makeFakeOffer, makeFakeComment} from '../../test-mocks/test-mocks';
import {fetchOffersAction, fetchOfferAction, fetchNearbyOffer, fetchCommentsAction, addCommentAction, fetchFavoritesAction, addFavoriteAction} from '../api-actions';

const offers = [makeFakeOffer()];
const offer = makeFakeOffer();
const comments = [makeFakeComment()];
const comment = makeFakeComment();

describe('Reducer: offersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update offers by load offers', () => {
    expect(offersData.reducer(initialState, {type: fetchOffersAction.fulfilled.type, payload: offers}))
      .toEqual({...initialState, offers});
  });

  it('should update offer', () => {
    expect(offersData.reducer(initialState, {type: fetchOfferAction.fulfilled.type, payload: offer}))
      .toEqual({...initialState, offer});
  });

  it('should update nearby offer', () => {
    expect(offersData.reducer(initialState, {type: fetchNearbyOffer.fulfilled.type, payload: offers}))
      .toEqual({...initialState, nearbyOffers: offers});
  });

  it('should update comments', () => {
    expect(offersData.reducer(initialState, {type: fetchCommentsAction.fulfilled.type, payload: comments}))
      .toEqual({...initialState, comments});
  });

  it('should update add comments by load comment', () => {
    expect(offersData.reducer(initialState, {type: addCommentAction.fulfilled.type, payload: comment}))
      .toEqual({...initialState, comments: comment});
  });

  it('should update favorite offers', () => {
    expect(offersData.reducer(initialState, {type: fetchFavoritesAction.fulfilled.type, payload: offers}))
      .toEqual({...initialState, favoritesOffers: offers});
  });

  it('should update favorite offers by add favorite offer', () => {
    expect(offersData.reducer(initialState, {type: addFavoriteAction.fulfilled.type, payload: offer}))
      .toEqual({...initialState, favoritesOffers: [offer]});
  });
});
