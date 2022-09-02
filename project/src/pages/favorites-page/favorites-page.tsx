import Logo from '../../components/logo/logo';
import Navigation from '../../components/navigation/navigation';
import FavoritesItem from '../../components/favorites-item/favorites-item';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getFavoriteOffers} from '../../store/offers-data/selectors';
import {fetchFavoritesAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function FavoritesPage(): JSX.Element {
  const favoritesOffers = useAppSelector(getFavoriteOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  },[dispatch]);

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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoritesOffers.length !== 0 ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {[...new Set(favoritesOffers.map((offer) => offer.city.name))].map((cityName) => <FavoritesItem key ={cityName} offers={favoritesOffers} city={cityName} />)}
              </ul>
            </section>
            : <FavoritesEmpty />}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
