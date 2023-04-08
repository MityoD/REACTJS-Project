import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../Projects/Comments.module.css'
import { useAuthContext } from "../../contexts/AuthContext";
import { getOne as getCommentReplays } from '../../services/toolService';
import { addReplay } from '../../services/commentService';
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
    const [replays, setReplays] = useState([])
    useEffect(() => {
        getCommentReplays('comments', _id).then(x => setReplays(x._replays))
    }, [])

    const { token, displayToast, isAuthenticated, userEmail } = useAuthContext();;

    const onAddReplaySubmit = async (data) => {
        try {
            const _replay = {
                comment: values.commentReplay,
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
            await addReplay(_id, { "_replays": [...replays, _replay] }, token);
            setReplays(x => [...x, _replay])
            values.commentReplay = '';
            displayToast({ title: "Your replay is sent", show: true, bg: 'secondary' });

        } catch (error) {
            console.log(error)
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
        }
    };
    const { values, changeHandler, onSubmit } = useForm({
        commentReplay: '',
    }, onAddReplaySubmit);


    return (
        <>

            <ListGroup.Item as="li">
                <div className={styles.commentItem}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{ownerEmail}</div>
                        {comment}
                    </div>
                    <Badge bg="secondary" pill>
                        {date}
                    </Badge>
                </div>

                <ListGroup as="ol">
                    {replays &&
                        replays.map(x =>
                            <ListGroup.Item as="li" className={styles.replayGroupItem} key={`${Date.now()} ${Math.random()}`}>
                                <div className={styles.commentItem}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{x.userEmail}</div>
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
                    <Form method="patch" onSubmit={onSubmit} className={styles.formReplay} >
                        <Form.Group controlId="title" className={styles.formGroupReplay}>
                            <Form.Label>Write your replay</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="commentReplay"
                                value={values.commentReplay}
                                onChange={changeHandler}
                                placeholder="Write your replay here" />
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Replay
                        </Button>
                    </Form>
                }
            </ListGroup.Item>
            <hr />
        </>
    )
}