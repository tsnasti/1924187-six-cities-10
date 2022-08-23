import {render, screen} from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    render(<FavoritesEmpty />);

    const textStatus = screen.getByText('Nothing yet saved.');
    const statusDescription = screen.getByText('Save properties to narrow down search or plan your future trips.');

    expect(textStatus).toBeInTheDocument();
    expect(statusDescription).toBeInTheDocument();
  });
});
