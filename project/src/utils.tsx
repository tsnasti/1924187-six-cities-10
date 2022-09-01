import {Offer} from './types/offer';
import {Comment} from './types/comment';
import dayjs from 'dayjs';

const sortLowPrice = (OfferA: Offer, OfferB: Offer) => OfferA.price - OfferB.price;
const sortHighPrice = (OfferA: Offer, OfferB: Offer) => OfferB.price - OfferA.price;
const sortRating = (OfferA: Offer, OfferB: Offer) => OfferB.rating - OfferA.rating;

const compareDays = (commentA: Comment, commentB: Comment) => dayjs(commentB.date).diff(dayjs(commentA.date));

export {sortLowPrice, sortHighPrice, sortRating, compareDays};
