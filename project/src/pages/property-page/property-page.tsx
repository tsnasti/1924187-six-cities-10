import CommentForm from '../../components/comment-form/comment-form';
import CommentList from '../../components/comment-list/comment-list';
import CardList from '../../components/card-list/card-list';
import Logo from '../../components/logo/logo';
import Navigation from '../../components/navigation/navigation';
import Map from '../../components/map/map';
import PropertyImage from '../../components/property-image/property-image';
import PropertyGoods from '../../components/property-goods/property-goods';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchOfferAction, fetchCommentsAction, fetchNearbyOffer, addFavoriteAction, fetchFavoritesAction} from '../../store/api-actions';
import {addRating, FavoriteStatus} from '../../const';
import {useParams} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getOffer, getnearbyOffers, getComments} from '../../store/offers-data/selectors';
import {useEffect} from 'react';

function PropertyPage(): JSX.Element {
  const authorization = useAppSelector(getAuthorizationStatus);
  const offer = useAppSelector(getOffer);
  const comments = useAppSelector(getComments).slice(0, 10);
  const nearbyOffers = useAppSelector(getnearbyOffers).slice(0, 3);
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const addOffer = () => {
    if (id) {
      dispatch(fetchOfferAction(id));
    }
  };
  const addComments = () => {
    if (id) {
      dispatch(fetchCommentsAction(id));
    }
  };

  const getNearbyOffers = () => {
    if (id) {
      dispatch(fetchNearbyOffer(id));
    }
  };

  if (offer === null || offer?.id !== Number(id)) {
    addOffer();
    addComments();
    getNearbyOffers();
  }

  const addFavoritesOffers = () => {
    dispatch(fetchFavoritesAction());
  };

  useEffect(() => {
    addFavoritesOffers();
  },[]);

  const clickHandle = () => {
    dispatch(addFavoriteAction({hotelId: offer?.id, status: offer?.isFavorite ? FavoriteStatus.NotFavorites : FavoriteStatus.IsFavorites}));
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <Navigation />
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer?.images.slice(0,6).map((src) => <PropertyImage key = {src} src={src} />)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer?.isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name" data-testid="property-name">
                  {offer?.title}
                </h1>
                <button className={`property__bookmark-button ${offer?.isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button" onClick={clickHandle}>
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${offer ? addRating(offer.rating) : 0}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer?.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer?.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer?.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer?.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer?.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer?.goods.map((goods) => <PropertyGoods key = {goods} goods={goods} />)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer?.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer?.host.name}
                  </span>
                  {offer?.host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer?.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <CommentList comments={comments} />
                {authorization === AuthorizationStatus.Auth ? <CommentForm hotelId={offer?.id}/> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            {nearbyOffers.length !== 0 ? <Map offers={nearbyOffers} activeOffer={offer} city={nearbyOffers[0].city}/> : ''}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardList offers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyPage;
