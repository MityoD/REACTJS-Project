import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../Projects/Comments.module.css'
import { useAuthContext } from "../../contexts/AuthContext";
import { getOne as getCommentReplies } from '../../services/toolService';
import { addReply } from '../../services/commentService';
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from 'react';

export const CommentItem = (
    {
        ownerEmail,
        comment,
        date,
        _id,
    }
) => {
    const [replies, setReplies] = useState([])
    useEffect(() => {
        getCommentReplies('comments', _id).then(x => setReplies(x._replies))
    }, [])

    const { token, displayToast, isAuthenticated, userEmail } = useAuthContext();;

    const onAddReplySubmit = async (data) => {
        try {
            const _reply = {
                comment: values.commentReply,
                date: `${new Date().toLocaleString('en-GB', {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour12: false,
                    hour: "numeric",
                    minute: "numeric"
                })}`,
                userEmail
            }
            await addReply(_id, { "_replies": [...replies, _reply] }, token);
            setReplies(x => [...x, _reply])
            values.commentReply = '';
            displayToast({ title: "Your reply is sent", show: true, bg: 'secondary' });

        } catch (error) {
            console.log(error)
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
        }
    };
    const { values, changeHandler, onSubmit } = useForm({
        commentReply: '',
    }, onAddReplySubmit);


    return (
        <>

            <ListGroup.Item as="li">
                <div className={styles.commentItem}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{ownerEmail.split('@')[0]}</div>
                        {comment}
                    </div>
                    <Badge bg="secondary" pill>
                        {date}
                    </Badge>
                </div>

                <ListGroup as="ol">
                    {replies &&
                        replies.map(x =>
                            <ListGroup.Item as="li" className={styles.replyGroupItem} key={`${Date.now()} ${Math.random()}`}>
                                <div className={styles.commentItem}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{x.userEmail.split('@')[0]}</div>
                                        {x.comment}
                                    </div>
                                    <Badge bg="secondary" pill>
                                        {x.date}
                                    </Badge>
                                </div>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>

                {isAuthenticated &&
                    <Form method="patch" onSubmit={onSubmit} className={styles.formReply} >
                        <Form.Group controlId="title" className={styles.formGroupReply}>
                            <Form.Label>Write your reply</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="commentReply"
                                value={values.commentReply}
                                onChange={changeHandler}
                                placeholder="Write your reply here" />
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Reply
                        </Button>
                    </Form>
                }
            </ListGroup.Item>
            <hr />
        </>
    )
}