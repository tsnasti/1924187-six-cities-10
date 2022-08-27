import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer} from '../../test-mocks/test-mocks';
import {Routes, Route} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import HistoryRoute from '../../components/history-route/history-route';
import Navigation from './navigation';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const fakeOffer = makeFakeOffer();

describe('Component: Navigation', () => {
  it('should render correctly when user auth', () => {
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
          <Navigation />
        </HistoryRoute>
      </Provider>
    );

    const textElement = screen.getByText('Sign out');
    expect(textElement).toBeInTheDocument();
  });

  it('should redirect to favorites url when user clicked to link', async () => {
    history.push('/fake');

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
          <Routes>
            <Route
              path="/favorites"
              element={<h1>This is favorites page</h1>}
            />
            <Route
              path='*'
              element={<Navigation />}
            />
          </Routes>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.queryByText(/This is favorites page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('favorites-link'));
    expect(screen.getByText(/This is favorites page/i)).toBeInTheDocument();
  });

  it('should render correctly when user no auth', async () => {
    render(
      <Provider store={mockStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
        },
        DATA: {
          favoritesOffers: [fakeOffer],
        },
      })}
      >
        <HistoryRoute history={history}>
          <Navigation />
        </HistoryRoute>
      </Provider>
    );

    const textElement = screen.getByText('Sign in');
    expect(textElement).toBeInTheDocument();
  });

  it('should redirect to login url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <Provider store={mockStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
        },
        DATA: {
          favoritesOffers: [fakeOffer],
        },
      })}
      >
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path="/login"
              element={<h1>This is login page</h1>}
            />
            <Route
              path='*'
              element={<Navigation />}
            />
          </Routes>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.queryByText(/This is login pag/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('login-link'));
    expect(screen.getByText(/This is login pag/i)).toBeInTheDocument();
  });
});
