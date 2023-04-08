import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { addItemToCart } from '../../services/orderService';

export const Product = ({
    _id,
    price,
    title,
    imageUrl,
    category,
    role
}) => {
    //, display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'stretch'
    const { isAuthenticated, displayToast, userId, token } = useAuthContext();

    const addItemHandler = async () => {
        const result = await addItemToCart('products', userId, _id, token);
        if (result.status === 'existing') {
            displayToast({ title: "This product is already in your cart!", show: true, bg: 'warning' })
        } else {
            displayToast({ title: "Product added to cart!", show: true, bg: 'success' })
        }
    }
    return (
        <Card style={{ width: '18rem', marginLeft: '40px', marginRight: '40px', padding: '0' }}>
            {(isAuthenticated && !role) &&
                <>
                    <Button style={{ width: '100%' }} variant="success" onClick={addItemHandler}>Add to Cart</Button>
                </>
            }
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Category: {category}
                </Card.Text>
                <Card.Text>
                    Price: {price}
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
