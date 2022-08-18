type FavoritesCityProps = {
  city: string;
};

export default function FavoritesCity ({city}: FavoritesCityProps): JSX.Element {
  return (
    <div className="locations__item">
      <a className="locations__item-link" href="#">
        <span>{city}</span>
      </a>
    </div>
  );
}
