import {Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute, isCheckedAuth} from '../../const';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import LoadingScreen from '../../pages/loading-page/loading-page';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PropertyPage from '../../pages/property-page/property-page';
import ErrorPage from '../../pages/error-page/error-page';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<PropertyPage />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
