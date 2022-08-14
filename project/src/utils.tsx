import {Offer} from './types/offer';
import {Comment} from './types/comment';
import dayjs from 'dayjs';

const sortingLowPrice = (OfferA: Offer, OfferB: Offer) => OfferA.price - OfferB.price;
const sortingHighPrice = (OfferA: Offer, OfferB: Offer) => OfferB.price - OfferA.price;
const sortingRating = (OfferA: Offer, OfferB: Offer) => OfferB.rating - OfferA.rating;

const compareDays = (commentA: Comment, commentB: Comment) => dayjs(commentB.date).diff(dayjs(commentA.date));

export {sortingLowPrice, sortingHighPrice, sortingRating, compareDays};
