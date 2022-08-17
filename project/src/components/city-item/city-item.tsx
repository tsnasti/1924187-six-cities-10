import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCity} from '../../store/offer-process/selectors';
import {chooseCity} from '../../store/offer-process/offer-process';

type CityItemProps = {
  city: string;
}

export default function CityItem({city} : CityItemProps): JSX.Element {
  const activeCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`} href="#" onClick={() => dispatch(chooseCity({city}))}>
        <span>{city}</span>
      </a>
    </li>
  );
}
