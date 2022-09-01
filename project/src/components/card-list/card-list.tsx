import Card from '../card/card';
import {Offer} from '../../types/offer';

type CardListProps = {
  offers: Offer[];
  addActiveCard ? : (Offer: Offer | undefined) => void | undefined
};

export default function CardList ({offers, addActiveCard}: CardListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => <Card key = {offer.id} offer={offer} addActiveCard={addActiveCard}/>)}
    </>
  );
}
