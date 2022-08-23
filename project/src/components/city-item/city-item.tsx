import {useAppSelector} from '../../hooks';
import {getCity} from '../../store/offer-process/selectors';

type CityItemProps = {
  city: string;
  selectCity: (city: string) => void;
}

export default function CityItem({city, selectCity} : CityItemProps): JSX.Element {
  const activeCity = useAppSelector(getCity);

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`} href="#" onClick={() => selectCity(city)}>
        <span>{city}</span>
      </a>
    </li>
  );
}
