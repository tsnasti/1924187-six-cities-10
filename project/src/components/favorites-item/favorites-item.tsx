import FavoritesCardComponent from '../favorites-card/favorites-card';
import {Offer} from '../../types/offer';

type FavoritesItemProps = {
  offer: Offer;
};

export default function FavoritesItem ({offer}: FavoritesItemProps): JSX.Element {
  const {isFavorite} = offer;
  const addCity = () => isFavorite ?
    <div className="locations__item">
      <a className="locations__item-link" href="#">
        <span>{offer.city.name}</span>
      </a>
    </div>
    : '';
  const addFavoriteCard = () => isFavorite ? <FavoritesCardComponent offer={offer}/> : '';
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        {addCity()}
      </div>
      <div className="favorites__places">
        {addFavoriteCard()}
      </div>
    </li>
  );
}
