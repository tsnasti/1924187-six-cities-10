import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer} from '../../test-mocks/test-mocks';
import {AuthorizationStatus} from '../../const';
import HistoryRoute from '../../components/history-route/history-route';
import thunk from 'redux-thunk';
import FavoritesPage from './favorites-page';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const fakeOffer = makeFakeOffer();

describe('Component: FavoritesPage', () => {
  it('should render correctly when have added offers', () => {
    render(
      <Provider store={mockStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
        DATA: {
          favoritesOffers: [fakeOffer],
        },
      })}
      >
        <HistoryRoute history={history}>
          <FavoritesPage />
        </HistoryRoute>
      </Provider>
    );

    const textElement = screen.getByText('Saved listing');
    expect(textElement).toBeInTheDocument();
  });

  it('should render correctly without added offers', () => {
    render(
      <Provider store={mockStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
        DATA: {
          favoritesOffers: [],
        },
      })}
      >
        <HistoryRoute history={history}>
          <FavoritesPage />
        </HistoryRoute>
      </Provider>
    );

    const textElement = screen.getByText('Nothing yet saved.');
    expect(textElement).toBeInTheDocument();
  });
});
