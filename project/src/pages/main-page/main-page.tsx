import CardList from '../../components/card-list/card-list';
import Navigation from '../../components/navigation/navigation';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import MainEmpty from '../../components/main-empty/main-empty';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {Offer} from '../../types/offer';

function MainPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | undefined>(undefined);
  const activeCity = useAppSelector((state) => state.city);
  const currentCityOffers = useAppSelector((state) => state.offers).filter((offer) => offer.city.name === activeCity);

  return (
    <div className="page page--gray page--main">
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {currentCityOffers.length !== 0 ?
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCityOffers.length} places to stay in {activeCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <CardList offers={currentCityOffers} addActiveCard={setActiveCard}/>
              </section>
              : <MainEmpty city ={activeCity}/>}
            <div className="cities__right-section">
              <section className="cities__map map">
                {currentCityOffers.length !== 0 ? <Map offers={currentCityOffers} activeCard={activeCard}/> : ''}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
