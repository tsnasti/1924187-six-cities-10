import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {CITIES} from '../../const';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import CityList from './city-list';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  OFFERS: {
    city: CITIES.PARIS,
  },
});
const selectCity = jest.fn();

describe('Component: CityList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CityList selectCity={selectCity} />
        </HistoryRoute>
      </Provider>
    );

    const listElement = screen.getByTestId('locations-container');
    expect(listElement).toBeInTheDocument();
  });
});
