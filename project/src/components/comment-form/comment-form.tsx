import {useState, ChangeEvent, FormEvent} from 'react';
import {RatingStar, CommentSymbolsLength} from '../../const';
import {addCommentAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';
import {CommentData} from '../../types/comment';
import {unwrapResult} from '@reduxjs/toolkit';

type CommentFormProps = {
  hotelId: number | undefined;
};

export default function CommentForm ({hotelId}: CommentFormProps) {
  const [formData, setFormData] = useState({
    comment: '',
    rating: null,
  });

  const [disabledStatus, setDisabledStatus] = useState<boolean>(false);

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name, value} = target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const dispatch = useAppDispatch();

  const onSubmit = (commentData: CommentData) => {
    dispatch(addCommentAction(commentData))
      .then(unwrapResult)
      .then(() => setFormData({comment: '', rating: null}), () => setFormData({comment: formData.comment, rating: formData.rating}));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setDisabledStatus(true);

    if (formData !== null) {
      onSubmit({
        comment: formData.comment,
        rating: formData.rating,
        hotelId: hotelId
      });
    }
    setDisabledStatus(false);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value={RatingStar.Five} id="5-stars" type="radio" onChange={handleInputChange} checked={Number(formData.rating) === RatingStar.Five} disabled={disabledStatus}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={RatingStar.Four} id="4-stars" type="radio" onChange={handleInputChange} checked={Number(formData.rating) === RatingStar.Four} disabled={disabledStatus}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={RatingStar.Three} id="3-stars" type="radio" onChange={handleInputChange} checked={Number(formData.rating) === RatingStar.Three} disabled={disabledStatus}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={RatingStar.Two} id="2-stars" type="radio" onChange={handleInputChange} checked={Number(formData.rating) === RatingStar.Two} disabled={disabledStatus}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={RatingStar.One} id="1-star" type="radio" onChange={handleInputChange} checked={Number(formData.rating) === RatingStar.One} disabled={disabledStatus}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="comment" value={formData.comment} onChange={handleInputChange} disabled={disabledStatus} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={formData.comment.length < CommentSymbolsLength.Min || formData.rating === null || formData.comment.length > CommentSymbolsLength.Max || disabledStatus}>Submit</button>
      </div>
    </form>
  );
}
