type PropertyGoodsProps = {
  goods: string;
}

function PropertyGoods({goods}: PropertyGoodsProps): JSX.Element {
  return (
    <li className="property__inside-item">
      {goods}
    </li>
  );
}

export default PropertyGoods;
