import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
export const Product = ({
    _id,
    title,
    imageUrl,
    category,
    role
}) => {
    //, display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'stretch'
    return (
        <Card style={{ width: '18rem', marginLeft: '40px', marginRight: '40px', padding: '0' }}>

            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {category}
                </Card.Text>
            </Card.Body>

            <Card.Footer>
                <Button as={Link} to={`/products/details/${_id}`} variant="primary">Details</Button>
                {role &&
                    <>
                        <Button className='m-1' variant="secondary" as={Link} to={`/products/edit/${_id}`}>Edit</Button>
                        <Button variant="danger" as={Link} to={`/products/delete/${_id}`}>Delete</Button>
                    </>
                }
            </Card.Footer>
        </Card>
    );
}
