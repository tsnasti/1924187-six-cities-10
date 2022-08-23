import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {fetchOffersAction, fetchOfferAction, fetchNearbyOffer, checkAuthAction, loginAction, logoutAction, fetchCommentsAction, addCommentAction, fetchFavoritesAction, addFavoriteAction} from './api-actions';
import {APIRoute, RatingStar} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {CommentData} from '../types/comment';
import {FavoriteOfferData} from '../types/offer';
import {makeFakeOffer, makeFakeComment} from '../test-mocks/test-mocks';
import {redirectToRoute} from './action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch Load_Offers when GET /hotels', async () => {
    const mockOffers = [makeFakeOffer()];
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Offer when GET /hotels/id', async () => {
    const mockOffer = makeFakeOffer();
    mockAPI
      .onGet(`${APIRoute.Offers}/1`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchOfferAction('1'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_NearbyOffers when GET /hotels/id/nearby', async () => {
    const mockNearbyOffers = [makeFakeOffer()];
    mockAPI
      .onGet(`${APIRoute.Offers}/1/nearby`)
      .reply(200, mockNearbyOffers);

    const store = mockStore();

    await store.dispatch(fetchNearbyOffer('1'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyOffer.pending.type,
      fetchNearbyOffer.fulfilled.type
    ]);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456mo'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(2);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch Load_Comments when GET /comments', async () => {
    const mockComments = [makeFakeComment()];
    mockAPI
      .onGet(`${APIRoute.Comments}/1`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction('1'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Comment when POST /comments/id', async () => {
    const fakeComment: CommentData = {hotelId: 1, comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.', rating: RatingStar.Three};

    mockAPI
      .onPost(`${APIRoute.Comments}/1`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(addCommentAction(fakeComment));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addCommentAction.pending.type,
      addCommentAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_FavoritesOffers when GET /favorites', async () => {
    const mockFavoritesOffers = [makeFakeOffer()];
    mockAPI
      .onGet(APIRoute.Favotites)
      .reply(200, mockFavoritesOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_FavoritesOffer when POST /favorites/id/status', async () => {
    const fakeFavoriteOffer: FavoriteOfferData = {hotelId: 1, status: 1};

    mockAPI
      .onPost(`${APIRoute.Favotites}/1/1`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(addFavoriteAction(fakeFavoriteOffer));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addFavoriteAction.pending.type,
      addFavoriteAction.fulfilled.type
    ]);
  });
});
