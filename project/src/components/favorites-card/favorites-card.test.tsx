import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer} from '../../test-mocks/test-mocks';
import {State} from '../../types/state';
import {addFavoriteAction} from '../../store/api-actions';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {api} from '../../store';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import HistoryRoute from '../../components/history-route/history-route';
import FavoritesCard from './favorites-card';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const fakeOffer = makeFakeOffer();

const store = mockStore({
  DATA: {
    favoritesOffers: [fakeOffer],
  },
});

describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <FavoritesCard offer={fakeOffer}/>
        </HistoryRoute>
      </Provider>
    );

    const textElement = screen.getByText(fakeOffer.title);
    expect(textElement).toBeInTheDocument();
  });

  it('should add card in favorites, when user clicked to button', async () => {
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStoreWithThunk = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
    const storeThunk = mockStoreWithThunk({});

    render(
      <Provider store={storeThunk}>
        <HistoryRoute history={history}>
          <FavoritesCard offer={{...fakeOffer, isFavorite: false}}/>
        </HistoryRoute>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));
    const actions = storeThunk.getActions().map(({type: t}) => t);
    expect(actions).toEqual([addFavoriteAction.pending.type,]);
  });
});
