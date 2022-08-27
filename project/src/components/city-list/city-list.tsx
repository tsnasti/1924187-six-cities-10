import CityItem from '../city-item/city-item';
import {memo} from 'react';
import {CITES} from '../../const';

type CityListProps = {
  selectCity: (city: string) => void;
}

function CityList({selectCity}: CityListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list" data-testid="locations-container">
      {Array.from(Object.values(CITES)).map((city) => <CityItem key = {city} city={city} selectCity={selectCity}/>)}
    </ul>
  );
}

export default memo(CityList);
