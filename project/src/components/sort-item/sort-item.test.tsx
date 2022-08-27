import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {SORT} from '../../const';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import HistoryRoute from '../../components/history-route/history-route';
import SortItem from './sort-item';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const addSorting = jest.fn();

const store = mockStore({
  OFFERS: {
    sortItem: SORT.POPULAR,
  },
});

describe('Component: SortItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <SortItem sortItem={SORT.POPULAR} addSorting={addSorting}/>
        </HistoryRoute>
      </Provider>
    );

    const itemElement = screen.getByTestId('option');
    expect(itemElement).toBeInTheDocument();
  });

  it('should add option when user clicked to link', async () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <SortItem sortItem={SORT.POPULAR} addSorting={addSorting}/>
        </HistoryRoute>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('option'));
    expect(addSorting).toBeCalled();
  });
});
