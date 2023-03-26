import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getLikes, likeTool, getLiked } from '../../services/toolService';
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
export const ToolCard = ({
    _id,
    title,
    imageUrl,
    category,
    type,
    summary,
    isOwner,
    userId,
    token
}) => {

    const [likes, setLikes] = useState(0);
    const [canLike, setCanLike] = useState(false);

    useEffect(() => {
        getLiked(userId, _id, token).then(x => { setCanLike(!x) })
        getLikes(_id, token).then(x => { setLikes(x) });
    }, [_id, token, userId])

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
    const { isAuthenticated } = useAuthContext();

    return (
        <Card style={{ width: '18rem', marginLeft: '40px', padding: '0' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Category: {category}
                </Card.Text>
                <Card.Text>
                    Type: {type}
                </Card.Text>
                {/* <Button as={Link} to={`/tools/details/${_id}`} variant="primary">Details</Button>
                {isOwner &&
                    <>
                        <Button className='m-1' variant="secondary" as={Link} to={`/tools/edit/${_id}`}>Edit</Button>
                        <Button variant="danger" as={Link} to={`/tools/delete/${_id}`}>Delete</Button>
                    </>
                } */}
            </Card.Body>
            <Card.Footer style={{ width: '100%', display: 'flex', gap:'10px', flexDirection:'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button as={Link} to={`/tools/details/${_id}`} variant="primary" style={{ marginTop: '6px' }}>Details</Button>
                    {isOwner &&
                        <>
                            <Button variant="secondary" as={Link} to={`/tools/edit/${_id}`} style={{ marginTop: '6px' }}>Edit</Button>
                            <Button variant="danger" as={Link} to={`/tools/delete/${_id}`} style={{ marginTop: '6px' }}>Delete</Button>
                        </>
                    }
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <small className="text-muted" style={{marginBottom:'16px',marginTop:'16px'}}>Liked from {likes} people</small>

                    {(canLike && isAuthenticated) &&
                        <Button  style={{ width: '25%'}} variant="warning" onClick={likeClick}>Like</Button>
                    }
                </div>
            </Card.Footer>
        </Card>
    );
}
//as={Link} to={`/tools/like/${_id}`}