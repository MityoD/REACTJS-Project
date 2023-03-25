import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
export const ToolCard = ({
    _id,
    title,
    imageUrl,
    category,
    isOwner
}) => {
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
        </Card>
    );
}
