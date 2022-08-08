import {useAppDispatch, useAppSelector} from '../../hooks';
import {sorting} from '../../store/action';

type SortItemProps = {
  sortItem: string;
}

export default function SortItem({sortItem} : SortItemProps): JSX.Element {
  const activeItem = useAppSelector((state) => state.sortItem);
  const dispatch = useAppDispatch();

  return (
    <li className={sortItem === activeItem ? 'places__option--active' : 'places__option'} tabIndex={0} onClick={() => dispatch(sorting({sortItem}))}>{sortItem}</li>
  );
}
