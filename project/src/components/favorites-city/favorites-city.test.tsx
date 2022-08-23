import {render, screen} from '@testing-library/react';
import {CITES} from '../../const';
import FavoritesCity from './favorites-city';

describe('Component: FavoritesCity', () => {
  it('should render correctly', () => {
    render(<FavoritesCity city={CITES.AMSTERDAM} />);

    const linkElement = screen.getByText(`${CITES.AMSTERDAM}`);

    expect(linkElement).toBeInTheDocument();
  });
});
