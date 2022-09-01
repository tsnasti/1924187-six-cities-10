import {Link} from 'react-router-dom';
import {memo} from 'react';
import {getEmail} from '../../services/tokens/email';
import {AuthorizationStatus, AppRoute} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getOffers} from '../../store/offers-data/selectors';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions';

function Navigation(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorization = useAppSelector(getAuthorizationStatus);
  const favoritesOffers = useAppSelector(getOffers).filter((offer) => offer.isFavorite === true);

  if (authorization === AuthorizationStatus.Auth) {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} data-testid="favorites-link">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{getEmail()}</span>
            <span className="header__favorite-count">{favoritesOffers.length}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="#" onClick={(evt) => {evt.preventDefault(); dispatch(logoutAction());}}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login} data-testid="login-link">
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__login">Sign in</span>
      </Link>
    </li>
  );
}

export default memo(Navigation);
