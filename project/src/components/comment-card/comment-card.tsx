import {Comment} from '../../types/comment';
import {addRating} from '../../const';
import dayjs from 'dayjs';

type CommentCardProps = {
  userComment: Comment;
};

export default function CommentCard ({userComment}: CommentCardProps): JSX.Element {
  const {comment, rating, date, user} = userComment;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${addRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{dayjs(date).format('MMMM YYYY')}</time>
      </div>
    </li>
  );
}
