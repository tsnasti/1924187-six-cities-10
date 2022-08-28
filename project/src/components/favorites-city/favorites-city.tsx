import {Link} from 'react-router-dom';

type FavoritesCityProps = {
  city: string;
};

export default function FavoritesCity ({city}: FavoritesCityProps): JSX.Element {
  return (
    <div className="locations__item">
      <Link className="locations__item-link" to="">
        <span>{city}</span>
      </Link>
    </div>
  );
}
