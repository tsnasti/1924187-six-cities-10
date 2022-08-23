import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import LoadingPage from './loading-page';

describe('Component: LoadingPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRoute history={history}>
        <LoadingPage />
      </HistoryRoute>,
    );

    const textElement = screen.getByText('Loading ...');

    expect(textElement).toBeInTheDocument();
  });
});
