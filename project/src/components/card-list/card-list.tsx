import Card from '../card/card';
import {Offer} from '../../types/offer';

type OfferPageListProps = {
  offers: Offer[];
  setActiveCard: (Offer: Offer | undefined) => void | undefined
};

export default function CardList ({offers, setActiveCard}: OfferPageListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key = {offer.id} offer={offer} setActiveCard = {setActiveCard}/>)}
    </div>
  );
}
