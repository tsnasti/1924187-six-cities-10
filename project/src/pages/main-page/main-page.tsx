import CardList from '../../components/card-list/card-list';
import Navigation from '../../components/navigation/navigation';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import MainEmpty from '../../components/main-empty/main-empty';
import SortList from '../../components/sort-list/sort-list';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {Offer} from '../../types/offer';
import {sortingLowPrice, sortingHighPrice, sortingRating} from '../../utils';
import {SORT} from '../../const';

function MainPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | undefined>(undefined);
  const activeCity = useAppSelector((state) => state.city);
  const currentCityOffers = useAppSelector((state) => state.offers).filter((offer) => offer.city.name === activeCity);

  switch (useAppSelector((state) => state.sortItem)) {
    case SORT.LOW_PRICE: {
      currentCityOffers.sort(sortingLowPrice);
      break;
    }
    case SORT.HIGH_PRICE: {
      currentCityOffers.sort(sortingHighPrice);
      break;
    }
    case SORT.TOP_RATED: {
      currentCityOffers.sort(sortingRating);
      break;
    }
  }

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
                <SortList />
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
