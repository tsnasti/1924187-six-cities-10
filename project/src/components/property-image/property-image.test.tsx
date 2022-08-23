import {render, screen} from '@testing-library/react';
import PropertyImage from './property-image';

describe('Component: PropertyImage', () => {
  it('should render correctly', () => {
    render(<PropertyImage src={'img/1.png'} />);

    const altElement = screen.getByAltText('Photo studio');

    expect(altElement).toBeInTheDocument();
  });
});
