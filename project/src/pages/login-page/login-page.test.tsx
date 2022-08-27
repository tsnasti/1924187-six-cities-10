import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {CITES} from '../../const';
import HistoryRoute from '../../components/history-route/history-route';
import thunk from 'redux-thunk';
import LoginPage from './login-page';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const store = mockStore({
  OFFERS: {
    city: CITES.PARIS,
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

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path="/"
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={<LoginPage />}
            />
          </Routes>
        </HistoryRoute>
      </Provider>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('main-link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
