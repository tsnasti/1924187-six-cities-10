import {render, screen} from '@testing-library/react';
import {makeFakeOffer} from '../../test-mocks/test-mocks';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../const';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import CardList from './card-list';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const fakeOffers = [makeFakeOffer()];

describe('Component: CardList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({
        USER: {authorizationStatus: AuthorizationStatus.Auth},
      })}
      >
        <HistoryRoute history={history}>
          <CardList offers={fakeOffers} />
        </HistoryRoute>
      </Provider>
    );

    const listElement = screen.getByTestId('cards-container');

    expect(listElement).toBeInTheDocument();
  });
});
