import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, AppRoute, CITES, SORT} from '../../const';
import {makeFakeOffer, makeFakeComment} from '../../test-mocks/test-mocks';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const mockOffer = makeFakeOffer();
const mockComment = makeFakeComment();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {
    offers: [mockOffer],
    isDataLoaded: false,
    offer: mockOffer,
    nearbyOffers: [],
    comments: [mockComment],
    favoritesOffers: [mockOffer],
  },
  OFFERS: {
    city: CITES.PARIS,
    sortItem: SORT.POPULAR,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/in Paris/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render "PropertyPage" when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.Room);

    render(fakeApp);

    expect(screen.getByTestId('property-name')).toBeInTheDocument();
  });

  it('should render "ErrorPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
