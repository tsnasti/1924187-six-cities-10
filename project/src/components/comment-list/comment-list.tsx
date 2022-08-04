import CommentCard from '../comment-card/comment-card';
import {Comment} from '../../types/comment';

type CommentListProps = {
  comments: Comment[];
};

export default function CommentList ({comments}: CommentListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => <CommentCard key = {comment.id} comment={comment} />)}
    </ul>
  );
}
