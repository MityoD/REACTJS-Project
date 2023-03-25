import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getLikes, likeTool, getLiked } from '../../services/toolService';
import { useState, useEffect } from 'react'

export const ToolCard = ({
    _id,
    title,
    imageUrl,
    category,
    isOwner,
    userId,
    token
}) => {

    const [likes, setLikes] = useState(0);
    const [canLike, setCanLike] = useState(true);

    useEffect(() => {
        getLikes(_id, token).then(x => { setLikes(x) });
        getLiked(userId, _id, token).then(x => {setCanLike(x)})
    }, [_id, token,userId])

    // const userCanLike = async () => {
    //     const result = await getLiked(userId, _id, token)
    //     return !result
    // }

    // var can = awaituserCanLike();

    // console.log(can)

    // const userLikedTool = async () => {
    //     const likes = await getLikes(_id,token);
    //    console.log(likes.incudes(`_ownerId:${userId}`))
    //     return likes.incudes(`_ownerId:${userId}`)
    // }

    const likeClick = async () => {
        if (!isOwner) {
            await likeTool(token, { toolId: _id });
            setLikes(x => x + 1)
            setCanLike(false)
        } else {
            alert("Owner can't like")
            return
        }
    }



    return (
        <Card style={{ width: '18rem', marginLeft: '40px' }}>
            <Card.Img variant="top" src="https://media.screwfix.com/is/image/ae235/412XT_P?wid=414&hei=414&dpr=on" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button as={Link} to={`/tools/details/${_id}`} variant="primary">Details</Button>
                {isOwner &&
                    <>
                        <Button className='m-1' variant="secondary" as={Link} to={`/tools/edit/${_id}`}>Edit</Button>
                        <Button variant="danger" as={Link} to={`/tools/delete/${_id}`}>Delete</Button>
                    </>
                }
            </Card.Body>
            <Card.Footer style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <small className="text-muted">Liked from {likes} people</small>

                {canLike &&
                    <Button className='m-1' style={{ width: '25%', marginLeft: 'auto' }} variant="warning" onClick={likeClick}>Like</Button>
                }

            </Card.Footer>
        </Card>
    );
}
//as={Link} to={`/tools/like/${_id}`}