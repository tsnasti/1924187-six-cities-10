import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute, isCheckedAuth} from '../../const';
import LoadingScreen from '../../pages/loading-page/loading-page';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PropertyPage from '../../pages/property-page/property-page';
import ErrorPage from '../../pages/error-page/error-page';
import PrivateRoute from '../private-route/private-route';
import {Comment} from '../../types/comment';

type AppScreenProps = {
  comments: Comment[];
}

function App({comments}: AppScreenProps): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
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
          element={<PropertyPage comments={comments}/>}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
