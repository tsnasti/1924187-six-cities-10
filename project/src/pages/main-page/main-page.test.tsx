import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer} from '../../test-mocks/test-mocks';
import {CITIES, SORT, AuthorizationStatus} from '../../const';
import HistoryRoute from '../../components/history-route/history-route';
import thunk from 'redux-thunk';
import MainPage from './main-page';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const mockOffer = makeFakeOffer();

describe('Component: MainPage', () => {
  it('should render correctly when have offers', () => {
    render(
      <Provider store={mockStore({
        USER: {authorizationStatus: AuthorizationStatus.Auth},
        DATA: {
          offers: [mockOffer],
          offer: mockOffer,
          favoritesOffers: [mockOffer],
        },
        OFFERS: {
          city: CITIES.AMSTERDAM,
          sortItem: SORT.POPULAR,
        },
      })}
      >
        <HistoryRoute history={history}>
          <MainPage />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText(CITIES.AMSTERDAM)).toBeInTheDocument();
  });

  it('should render correctly without offers', () => {
    render(
      <Provider store={mockStore({
        USER: {authorizationStatus: AuthorizationStatus.Auth},
        DATA: {
          offers: [],
          offer: mockOffer,
          favoritesOffers: [],
        },
        OFFERS: {
          city: CITIES.AMSTERDAM,
          sortItem: SORT.POPULAR,
        },
      })}
      >
        <HistoryRoute history={history}>
          <MainPage />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
