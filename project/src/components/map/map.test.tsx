import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer} from '../../test-mocks/test-mocks';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import Map from './map';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const fakeOffer = makeFakeOffer();

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRoute history={history}>
          <Map offers={[fakeOffer]} city={fakeOffer.city}/>
        </HistoryRoute>
      </Provider>
    );

    const mapElement = screen.getByTestId('map');
    expect(mapElement).toBeInTheDocument();
  });
});
