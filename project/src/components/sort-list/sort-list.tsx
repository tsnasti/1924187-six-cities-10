import SortItem from '../sort-item/sort-item';
import {useAppSelector} from '../../hooks';
import {useState, memo} from 'react';
import {getSorting} from '../../store/offer-process/selectors';
import {SORT} from '../../const';

type SortListProps = {
  addSorting: (sortItem: string) => void;
}

function SortList({addSorting}: SortListProps): JSX.Element {
  const [options, setOptions] = useState(false);
  const activeItem = useAppSelector(getSorting);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOptions((value) => !value)}>
        {activeItem}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${options && 'places__options--opened'}`} data-testid="option-list">
        {Array.from(Object.values(SORT)).map((sortItem) => <SortItem key = {sortItem} sortItem={sortItem} addSorting={addSorting}/>)}
      </ul>
    </form>
  );
}

export default memo(SortList);
