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
import {getCity, sortedOffers} from '../../store/offer-process/selectors';
import {chooseCity, sorting} from '../../store/offer-process/offer-process';

function MainPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | undefined>(undefined);
  const activeCity = useAppSelector(getCity);
  const currentCityOffers = useAppSelector(sortedOffers).filter((offer) => offer.city.name === activeCity);
  const dispatch = useAppDispatch();
  const selectCity = (city: string) => dispatch(chooseCity(city));
  const addSorting = (sortItem: string) => dispatch(sorting(sortItem));

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

      <main className={`page__main page__main--index ${currentCityOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList selectCity={selectCity} />
          </section>
        </div>
        <div className="cities">
          {currentCityOffers.length !== 0 ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCityOffers.length} places to stay in {activeCity}</b>
                <SortList addSorting={addSorting}/>
                <div className="cities__places-list places__list tabs__content">
                  <CardList offers={currentCityOffers} addActiveCard={setActiveCard} data-testid="cards"/>
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={currentCityOffers} activeCard={activeCard} city={currentCityOffers[0].city}/>
                </section>
              </div>
            </div>
            : <MainEmpty city={activeCity} />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
