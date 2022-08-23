import {render, screen} from '@testing-library/react';
import PropertyGoodsProps from './property-goods';

describe('Component: PropertyGoodsProps', () => {
  it('should render correctly', () => {
    render(<PropertyGoodsProps goods={'Heating'} />);

    const goodsElement = screen.getByText('Heating');

    expect(goodsElement).toBeInTheDocument();
  });
});
