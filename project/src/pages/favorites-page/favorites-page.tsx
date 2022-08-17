import Logo from '../../components/logo/logo';
import Navigation from '../../components/navigation/navigation';
import FavoritesItem from '../../components/favorites-item/favorites-item';
import {useAppSelector} from '../../hooks';
import {getOffers} from '../../store/offers-data/selectors';

function FavoritesPage(): JSX.Element {
  const currentCityOffers = useAppSelector(getOffers);
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
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {currentCityOffers.map((offer) => <FavoritesItem key = {offer.id} offer={offer} />)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
