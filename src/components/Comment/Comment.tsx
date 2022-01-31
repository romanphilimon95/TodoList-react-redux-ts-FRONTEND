import { useState } from 'react';
import { Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { CommentInterface } from '../../Modals/TaskInfoModal/TaskInfoModalTypesAndInterfaces';
import { CommentPropsType } from './CommentTypesAndInterfaces';
import axios from 'axios';
import './Comment.scss';

const Comment = ({
    setAllComments,
    allComments,
    comment,
}: CommentPropsType) => {
    const {
        commentText,
        author,
        date,
        _id 
    }: CommentInterface = comment;
    const [text, setText] = useState<string>(commentText);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const dispatch = useDispatch();

    const deleteComment = async (): Promise<void> => {
        const url: string = `${process.env.REACT_APP_SERVER_URL}/deleteComment?_id=${_id}`;

        await axios.delete(url)
            .then(() => {
                const newArray: CommentInterface[] = allComments.filter(elem => elem._id !== _id);
                setAllComments([...newArray]);
            })
            .catch(e => {
                dispatch(setAlert({
                    alertData: {
                      text: e.message,
                      isOpened: true
                    }
                  }));
            })
    }

    const changeCommentText = async (): Promise<void> => {
        const url: string = `${process.env.REACT_APP_SERVER_URL}/changeCommentText`;

        await axios.patch<CommentInterface>(url, {
            commentText: text,
            _id
        })
            .then((): void => {
                const index: number = allComments
                    .findIndex((elem: CommentInterface) => elem._id === _id);
                allComments[index].commentText = text;

                setAllComments([...allComments]);
                setIsEditing(false);
            })
            .catch(e => {
                dispatch(setAlert({
                    alertData: {
                      text: e.message,
                      isOpened: true
                    }
                  }));
            })
    }

    const undo = (): void => {
        setText(commentText);
        setIsEditing(false);
    }

    return (
        <div className="comment-wrapper">
            <div className="avatar">
                <p>
                    {author[0].toUpperCase()}
                </p>
            </div>
            <div className="comment-info">
                <p className="comment-author">
                    {author}
                </p>
                {
                    isEditing
                        ? <div className="comment-input">
                            <Input
                                value={text}
                                onChange={(e) => setText(e.currentTarget.value)}
                            />
                            <Button
                                bsSize="sm"
                                color="primary"
                                onClick={changeCommentText}
                            >
                                Save
                            </Button>
                            <Button
                                bsSize="sm"
                                outline
                                onClick={undo}
                            >
                                Undo
                            </Button>
                        </div>
                        : <p className="comment-text">
                            {text}
                        </p>
                }
                <div className="comment-other">
                    <p className="comment-date">
                        Posted {date}
                    </p>
                    <p
                        className="comment-action"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </p>
                    <p
                        className="comment-action"
                        data-testid="delete-comment-button"
                        onClick={deleteComment}
                    >
                        Remove
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment;