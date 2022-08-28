import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {CITIES} from '../../const';
import {makeFakeOffer} from '../../test-mocks/test-mocks';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import FavoritesItem from './favorites-item';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const fakeOffers = [makeFakeOffer()];

describe('Component: FavoritesItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRoute history={history}>
          <FavoritesItem city={CITIES.PARIS} offers={fakeOffers}/>
        </HistoryRoute>
      </Provider>
    );

    const cityElement = screen.getByTestId('favorites-places');
    expect(cityElement).toBeInTheDocument();
  });
});
