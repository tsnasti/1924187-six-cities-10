import {render, screen} from '@testing-library/react';
import {CITES} from '../../const';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(<MainEmpty city={CITES.AMSTERDAM} />);

    const textStatus = screen.getByText('No places to stay available');
    const statusDescription = screen.getByText(`We could not find any property available at the moment in ${CITES.AMSTERDAM}`);

    expect(textStatus).toBeInTheDocument();
    expect(statusDescription).toBeInTheDocument();
  });
});
