import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
export const Product = ({
    _id,
    title,
    imageUrl,
    category,
}) => {
    return (
        <Card style={{ width: '18rem', marginLeft:'40px'}}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {category}
                </Card.Text>
                <Button as={Link} to={`/details/${_id}`} variant="primary">Details</Button>
            </Card.Body>
        </Card>
    );
}
