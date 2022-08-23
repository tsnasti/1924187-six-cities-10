import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRoute history={history}>
        <Logo />
      </HistoryRoute>
    );

    const altElement = screen.getByTestId('logo');

    expect(altElement).toBeInTheDocument();
  });
});
