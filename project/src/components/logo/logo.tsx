import {NavLink} from 'react-router-dom';
import {memo} from 'react';

function Logo(): JSX.Element {
  const activeClassName = 'header__logo-link--active';

  return (
    <NavLink className={({isActive}) => isActive ? activeClassName : 'header__logo-link'} to="/">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </NavLink>
  );
}

export default memo(Logo);
