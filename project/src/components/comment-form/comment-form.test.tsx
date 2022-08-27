import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer, makeFakeComment} from '../../test-mocks/test-mocks';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import CommentForm from './comment-form';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const mockOffer = makeFakeOffer();
const mockComment = makeFakeComment();
const store = mockStore({
  DATA: {
    offers: [mockOffer],
    isDataLoaded: false,
    offer: mockOffer,
    nearbyOffers: [],
    comments: [mockComment],
    favoritesOffers: [mockOffer],
  },
});
const hotelId = 1;

describe('Component: CommentForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CommentForm hotelId={hotelId}/>
        </HistoryRoute>
      </Provider>
    );

    const textElement = screen.getByText('Submit');
    expect(textElement).toBeInTheDocument();
  });

  it('should button not disabled', async () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CommentForm hotelId={hotelId}/>
        </HistoryRoute>
      </Provider>
    );

    await userEvent.type(screen.getByRole('textbox'), 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.');
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    const [input] = screen.getAllByRole('radio');
    await userEvent.click(input);
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
});
