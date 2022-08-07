import {useAppDispatch, useAppSelector} from '../../hooks';
import {chooseCity} from '../../store/action';

type CityItemProps = {
  city: string;
}

export default function CityItem({city} : CityItemProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`} href="#" onClick={() => dispatch(chooseCity({city}))}>
        <span>{city}</span>
      </a>
    </li>
  );
}
