import { useState, useEffect } from 'react';
// components
import Comment from '../../components/Comment/Comment';
import {
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Modal,
  Label
} from 'reactstrap';
// types and interfaces
import { TaskInfoModalPropsType } from './TaskInfoModalTypesAndInterfaces';
import { 
  PostCommentInterface,
  CommentInterface,
 } from './TaskInfoModalTypesAndInterfaces';
 // other
import axios, { AxiosResponse } from 'axios';
import './TaskInfoModal.scss';

const TaskInfoModal = ({
  setIsTaskInfoModalOpened,
  isTaskInfoModalOpened,
  task
}: TaskInfoModalPropsType) => {
  const [commentText, setCommentText] = useState<string>('');
  const [commentOpened, setCommentOpened] = useState<boolean>(false);
  const [allComments, setAllComments] = useState<CommentInterface[]>([]);
  const { taskText, taskName, _id } = task;

  useEffect((): void => {
    const getComments = async (): Promise<void> => {
      const url: string = `${process.env.REACT_APP_SERVER_URL}/getTaskComments?taskId=${_id}`;
      await axios.get<CommentInterface[]>(url)
        .then(result => {
          setAllComments(result.data);
        })
    }

    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComment = (): void => {
    const addComment = async (): Promise<void> => {
      const currDate: Date = new Date();

      const getDate = (date: Date): string => {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
      }
      const url: string = `${process.env.REACT_APP_SERVER_URL}/addComment`;

      await axios
        .post<PostCommentInterface, AxiosResponse<CommentInterface>>(url, {
          commentText,
          taskId: _id,
          date: getDate(currDate)
        })
        .then((result) => {
          setAllComments([...allComments, result.data]);
          setCommentText("");
          setCommentOpened(false);
        });
    };

    commentOpened ? addComment() : setCommentOpened(true);
  }

  const undoComment = (): void => {
    setCommentText('');
    setCommentOpened(false);
  }

  return (
    <div>
      <Modal
        isOpen={isTaskInfoModalOpened}
        fullscreen="md"
        bssize=""
        toggle={() => setIsTaskInfoModalOpened(false)}
      >
        <ModalHeader toggle={() => setIsTaskInfoModalOpened(false)}>
          {taskName}
        </ModalHeader>
        <ModalBody>
          <Label>
            Description:
          </Label>
          <p className="taskText">
            {taskText}
          </p>
          <div
            className={
              commentOpened
                ? 'commentOpened'
                : 'commentClosed'
            }
          >
            <Input
              type="textarea"
              value={commentText}
              onChange={(e) => setCommentText(e.currentTarget.value)}
            />
          </div>
          <div className="buttons">
            <Button
              data-testid="btn"
              color="primary"
              bssize="sm"
              onClick={handleComment}
            >
              {
                commentOpened
                  ? 'Save'
                  : 'Add a comment'
              }
            </Button>
            {
              commentOpened &&
              <Button
                color="secondary"
                bssize="sm"
                onClick={undoComment}
              >
                Undo
              </Button>
            }
          </div>
          <div className="comments">
            {allComments && allComments.map((comment: CommentInterface) =>
              <Comment
                setAllComments={setAllComments}
                allComments={allComments}
                comment={comment}
                key={comment._id}
              />
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsTaskInfoModalOpened(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TaskInfoModal;