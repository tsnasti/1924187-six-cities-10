import CommentCard from '../comment-card/comment-card';
import {Comment} from '../../types/comment';
import {compareDays} from '../../utils';

type CommentListProps = {
  comments: Comment[];
};

export default function CommentList ({comments}: CommentListProps): JSX.Element {
  const sortedComments = comments.sort(compareDays);

  return (
    <ul className="reviews__list">
      {sortedComments.map((userComment) => <CommentCard key = {userComment.id} userComment={userComment} />)}
    </ul>
  );
}
