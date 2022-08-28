import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer} from '../../test-mocks/test-mocks';
import {State} from '../../types/state';
import {addFavoriteAction} from '../../store/api-actions';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {api} from '../../store';
import {AuthorizationStatus} from '../../const';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import HistoryRoute from '../../components/history-route/history-route';
import Card from './card';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const fakeOffer = makeFakeOffer();

describe('Component: Card', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({
        USER: {authorizationStatus: AuthorizationStatus.Auth},
      })}
      >
        <HistoryRoute history={history}>
          <Card offer={fakeOffer}/>
        </HistoryRoute>
      </Provider>
    );

    const textElement = screen.getByText(fakeOffer.title);
    expect(textElement).toBeInTheDocument();
  });

  it('should add card in favorites, when user clicked to button', async () => {
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStoreWithThunk = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
    const storeThunk = mockStoreWithThunk({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={storeThunk}>
        <HistoryRoute history={history}>
          <Card offer={{...fakeOffer, isFavorite: false}}/>
        </HistoryRoute>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));
    const actions = storeThunk.getActions().map(({type: t}) => t);
    expect(actions).toEqual([addFavoriteAction.pending.type,]);
  });
});
