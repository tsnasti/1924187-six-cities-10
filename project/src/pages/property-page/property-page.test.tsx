import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer, makeFakeComment} from '../../test-mocks/test-mocks';
import {AuthorizationStatus} from '../../const';
import HistoryRoute from '../../components/history-route/history-route';
import thunk from 'redux-thunk';
import PropertyPage from './property-page';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const mockOffer = makeFakeOffer();
const mockComment = makeFakeComment();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {
    offers: [mockOffer],
    offer: mockOffer,
    nearbyOffers: [],
    comments: [mockComment],
    favoritesOffers: [mockOffer],
  },
});

describe('Component: PropertyPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <PropertyPage />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByTestId('property-name')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getByText('Your review')).toBeInTheDocument();
  });
});
