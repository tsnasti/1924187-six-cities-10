import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {CITIES, AuthorizationStatus} from '../../const';
import HistoryRoute from '../../components/history-route/history-route';
import thunk from 'redux-thunk';
import LoginPage from './login-page';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  OFFERS: {
    city: CITIES.PARIS,
  },
});

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <LoginPage />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });
});
