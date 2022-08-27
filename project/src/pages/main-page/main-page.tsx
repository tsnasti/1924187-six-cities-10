import CardList from '../../components/card-list/card-list';
import Navigation from '../../components/navigation/navigation';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import MainEmpty from '../../components/main-empty/main-empty';
import SortList from '../../components/sort-list/sort-list';
import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {Offer} from '../../types/offer';
import {getCity} from '../../store/offer-process/selectors';
import {getOffers} from '../../store/offers-data/selectors';
import {getSorting} from '../../store/offer-process/selectors';
import {sortingLowPrice, sortingHighPrice, sortingRating} from '../../utils';
import {SORT} from '../../const';
import {chooseCity, sorting} from '../../store/offer-process/offer-process';

function MainPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | undefined>(undefined);
  const activeCity = useAppSelector(getCity);
  const currentCityOffers = useAppSelector(getOffers).filter((offer) => offer.city.name === activeCity);
  const dispatch = useAppDispatch();
  const selectCity = (city: string) => dispatch(chooseCity(city));
  const addSorting = (sortItem: string) => dispatch(sorting(sortItem));

  switch (useAppSelector(getSorting)) {
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
            <CityList selectCity={selectCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {currentCityOffers.length !== 0 ?
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCityOffers.length} places to stay in {activeCity}</b>
                <SortList addSorting={addSorting}/>
                <CardList offers={currentCityOffers} addActiveCard={setActiveCard} data-testid="cards"/>
              </section>
              : <MainEmpty city={activeCity}/>}
            <div className="cities__right-section">
              <section className="cities__map map">
                {currentCityOffers.length !== 0 ? <Map offers={currentCityOffers} activeCard={activeCard} city={currentCityOffers[0].city}/> : ''}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
