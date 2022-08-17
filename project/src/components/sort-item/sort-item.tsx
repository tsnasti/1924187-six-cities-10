import {useAppDispatch, useAppSelector} from '../../hooks';
import {getSorting} from '../../store/offer-process/selectors';
import {sorting} from '../../store/offer-process/offer-process';

type SortItemProps = {
  sortItem: string;
}

export default function SortItem({sortItem} : SortItemProps): JSX.Element {
  const activeItem = useAppSelector(getSorting);
  const dispatch = useAppDispatch();

  return (
    <li className={sortItem === activeItem ? 'places__option--active' : 'places__option'} tabIndex={0} onClick={() => dispatch(sorting({sortItem}))}>{sortItem}</li>
  );
}
