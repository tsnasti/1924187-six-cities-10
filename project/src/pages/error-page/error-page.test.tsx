import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import ErrorPage from './error-page';

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

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
});
