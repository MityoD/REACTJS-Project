import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
export const ProjectCart = ({
    _id,
    title,
    imageUrl,
    category,
    type,
    summary,
    isOwner,
    period,
    userId,
    location,
    token
}) => {
    //, display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'stretch'
    return (
            <Card style={{ width: '18rem', marginLeft: '40px', marginRight: '40px', padding: '0' }}>

                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        Type: {type}
                    </Card.Text>
                    <Card.Text>
                        Location: {location}
                    </Card.Text>
                    <Card.Text>
                        Period: {period}
                    </Card.Text>
                </Card.Body>

                <Card.Footer style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button as={Link} to={`/project/details/${_id}`} variant="primary">Details</Button>
                {isOwner &&
                    <>
                        <Button className='m-1' variant="secondary" as={Link} to={`/project/edit/${_id}`}>Edit</Button>
                        <Button variant="danger" as={Link} to={`/project/delete/${_id}`}>Delete</Button>
                    </>
                }
            </Card.Footer>
            </Card>
    );
}
