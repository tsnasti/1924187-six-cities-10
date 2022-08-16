import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Comment} from '../../types/comment';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getOffer = (state: State): Offer | undefined => state[NameSpace.Data].offer;
export const getnearbyOffers = (state: State): Offer[] => state[NameSpace.Data].nearbyOffers;
export const getComments = (state: State): Comment[] => state[NameSpace.Data].comments;
