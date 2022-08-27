import FavoritesCardComponent from '../favorites-card/favorites-card';
import FavoritesCity from '../favorites-city/favorites-city';
import {Offer} from '../../types/offer';

type FavoritesItemProps = {
  offers: Offer[];
  city: string;
};

export default function FavoritesItem ({offers, city}: FavoritesItemProps): JSX.Element {
  const filteredOffers = offers.filter((offer) => offer.city.name === city);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        {<FavoritesCity key = {city} city={city}/>}
      </div>
      <div className="favorites__places" data-testid="favorites-places">
        {filteredOffers.map((offer) => <FavoritesCardComponent key = {offer.id} offer={offer} />)}
      </div>
    </li>
  );
}
