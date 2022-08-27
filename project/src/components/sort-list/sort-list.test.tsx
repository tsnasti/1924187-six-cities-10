import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {SORT} from '../../const';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import SortList from './sort-list';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const addSorting = jest.fn();

const store = mockStore({
  OFFERS: {
    sortItem: SORT.POPULAR,
  },
});

describe('Component: SortList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <SortList addSorting={addSorting}/>
        </HistoryRoute>
      </Provider>
    );

    const itemElement = screen.getByTestId('option-list');
    expect(itemElement).toBeInTheDocument();
  });
});
