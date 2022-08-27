import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeComment} from '../../test-mocks/test-mocks';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import CommentList from './comment-list';

const history = createMemoryHistory();
const mockComments = [makeFakeComment()];
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  DATA: {
    comments: mockComments,
  },
});

describe('Component: CommentList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <CommentList comments={mockComments} />
        </HistoryRoute>
      </Provider>
    );

    const listElement = screen.getByTestId('reviews-list');
    expect(listElement).toBeInTheDocument();
  });
});
