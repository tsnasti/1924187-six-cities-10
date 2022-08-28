import {render, screen} from '@testing-library/react';
import {CITIES} from '../../const';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(<MainEmpty city={CITIES.AMSTERDAM} />);

    const textStatus = screen.getByText('No places to stay available');
    const statusDescription = screen.getByText(`We could not find any property available at the moment in ${CITIES.AMSTERDAM}`);

    expect(textStatus).toBeInTheDocument();
    expect(statusDescription).toBeInTheDocument();
  });
});
