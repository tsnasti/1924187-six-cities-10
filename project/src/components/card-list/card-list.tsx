import Card from '../card/card';
import {Offer} from '../../types/offer';

type OfferPageListProps = {
  offers: Offer[];
  addActiveCard ? : (Offer: Offer | undefined) => void | undefined
};

export default function CardList ({offers, addActiveCard}: OfferPageListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key = {offer.id} offer={offer} addActiveCard={addActiveCard}/>)}
    </div>
  );
}
