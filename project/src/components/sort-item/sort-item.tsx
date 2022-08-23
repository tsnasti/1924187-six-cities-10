import {useAppSelector} from '../../hooks';
import {getSorting} from '../../store/offer-process/selectors';

type SortItemProps = {
  sortItem: string;
  addSorting: (sortItem: string) => void;
}

export default function SortItem({sortItem, addSorting} : SortItemProps): JSX.Element {
  const activeItem = useAppSelector(getSorting);

  return (
    <li className={sortItem === activeItem ? 'places__option--active' : 'places__option'} tabIndex={0} onClick={() => addSorting(sortItem)}>{sortItem}</li>
  );
}
