import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {CITIES} from '../../const';
import FavoritesCity from './favorites-city';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('Component: FavoritesCity', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRoute history={history}>
          <FavoritesCity city={CITIES.AMSTERDAM} />
        </HistoryRoute>
      </Provider>
    );

    const linkElement = screen.getByText(`${CITIES.AMSTERDAM}`);
    expect(linkElement).toBeInTheDocument();
  });
});
