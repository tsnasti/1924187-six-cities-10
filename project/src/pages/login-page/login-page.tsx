import {useRef, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import {AppRoute, VALID_PASSWORD_LENGTH} from '../../const';
import {Link} from 'react-router-dom';
import {getCity} from '../../store/offer-process/selectors';
import Logo from '../../components/logo/logo';

function LoginPage(): JSX.Element {
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const currentCity = useAppSelector(getCity);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null
        && passwordRef.current !== null
        && passwordRef.current.value.length >= VALID_PASSWORD_LENGTH
        && (passwordRef.current.value.match(/\d[a-zA-Z]|[a-zA-Z]\d/))) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
      setValidPassword(true);
      navigate(AppRoute.Root);
    }
    setValidPassword(false);
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" ref={loginRef} type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={passwordRef} type="password" name="password" placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
              {!validPassword ? <span style={{color: 'red'}}>Password is not correct</span> : ''}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root} data-testid="main-link">
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
