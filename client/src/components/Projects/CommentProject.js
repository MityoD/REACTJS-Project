import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';
import { addTool as addComment } from '../../services/toolService';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../Projects/Comments.module.css'
import { CommentItem } from './CommentItem';
import { getProjectComments } from '../../services/commentService';
import { useEffect, useState } from 'react';

export const CommentProject = ({
    _projectId
}) => {
    const [comments, setComments] = useState(null);

    useEffect(() => {
        getProjectComments(_projectId).then(x => setComments(x))
    }, [])


    const { token, displayToast, userEmail, isAuthenticated } = useAuthContext();;

    const onAddCommentSubmit = async (data) => {
        try {
            const comment = {
                ...data,
                _projectId,
                date: `${new Date().toLocaleString('en-GB', {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour12: false,
                    hour: "numeric",
                    minute: "numeric"
                })}`,
                userEmail,
                _replies: []
            }

            const result = await addComment('/comments', comment, token);
            setComments(comments => [...comments, result])
            values.comment = '';
            displayToast({ title: "Your comment is sent", show: true, bg: 'secondary' });

        } catch (error) {
            console.log(error)
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
        }
    };
    const { values, changeHandler, onSubmit } = useForm({
        comment: '',
    }, onAddCommentSubmit);

    return (
        <div className={styles.comments}>

            {isAuthenticated ?
                <h3>Share your thoughts</h3>
                :
                <h3><Link to={'/login'} className={styles.link}>Login</Link> to share your thoughts</h3>
            }

            {isAuthenticated &&

                <Form method="post" onSubmit={onSubmit} className={styles.form} >
                    <Form.Group controlId="title" className={styles.formGroup}>
                        <Form.Label>Write your comment</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="comment"
                            value={values.comment}
                            onChange={changeHandler}
                            placeholder="Write your comment here" />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Comment
                    </Button>
                </Form>
            }

            <ListGroup as="ol" className={styles.listGroup}>
                {
                    comments ?
                        comments?.map(x => <CommentItem ownerEmail={x.userEmail} {...x} key={x._id}/>)
                        :
                        <h5>No comments yet</h5>
                }

            </ListGroup>
        </div>
    )
}