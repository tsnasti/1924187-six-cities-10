import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {CITIES} from '../../const';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import CityItem from './city-item';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  OFFERS: {
    city: CITIES.PARIS,
  },
});
const selectCity = jest.fn();

describe('Component: CityItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CityItem city={CITIES.PARIS} selectCity={selectCity}/>
        </HistoryRoute>
      </Provider>
    );

    const cityElement = screen.getByText(CITIES.PARIS);
    expect(cityElement).toBeInTheDocument();
  });

  it('should change city when user clicked to link', async () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CityItem city={CITIES.PARIS} selectCity={selectCity}/>
        </HistoryRoute>
      </Provider>
    );

    screen.getByRole('link').classList.contains('tabs__item--active');
    await userEvent.click(screen.getByRole('link'));
    expect(selectCity).toBeCalled();
  });
});
