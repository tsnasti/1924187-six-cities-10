import {useState} from 'react';
import Card from '../card/card';
import {Offer} from '../../types/offer';

type OfferPageListProps = {
  offers: Offer[];
};

export default function CardList ({offers}: OfferPageListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(0);
  offers.find((offer) => offer.id === activeCard);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key = {offer.id} offer={offer} setActiveCard = {setActiveCard}/>)}
    </div>
  );
}
