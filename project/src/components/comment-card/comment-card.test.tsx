import {render, screen} from '@testing-library/react';
import {makeFakeComment} from '../../test-mocks/test-mocks';
import CommentCard from './comment-card';

describe('Component: CommentCard', () => {
  it('should render correctly', () => {
    const fakecomment = makeFakeComment();
    render(<CommentCard userComment={fakecomment} />);

    const nameElement = screen.getByText(fakecomment.user.name);
    const textElement = screen.getByText(fakecomment.comment);

    expect(nameElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
