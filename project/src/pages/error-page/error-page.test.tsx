import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Routes, Route} from 'react-router-dom';
import HistoryRoute from '../../components/history-route/history-route';
import ErrorPage from './error-page';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    render(
      <HistoryRoute history={history}>
        <ErrorPage />
      </HistoryRoute>,
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRoute history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<ErrorPage />}
          />
        </Routes>
      </HistoryRoute>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('main-link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
