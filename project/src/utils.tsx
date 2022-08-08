import {Offer} from './types/offer';

const sortingLowPrice = (OfferA: Offer, OfferB: Offer) => OfferA.price - OfferB.price;
const sortingHighPrice = (OfferA: Offer, OfferB: Offer) => OfferB.price - OfferA.price;
const sortingRating = (OfferA: Offer, OfferB: Offer) => OfferB.rating - OfferA.rating;

export {sortingLowPrice, sortingHighPrice, sortingRating};
