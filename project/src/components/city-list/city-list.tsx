import CityItem from '../city-item/city-item';
import {CITES} from '../../const';

export default function CityList(): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {Array.from(Object.values(CITES)).map((city) => <CityItem key = {city} city={city}/>)}
    </ul>
  );
}
