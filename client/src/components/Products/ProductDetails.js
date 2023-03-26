import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { getOne } from '../../services/toolService';

export const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProuct] = useState({});
    const { userId } = useAuthContext();
    const userIsOwner = userId === product._ownerId;
    useEffect(() => {
        getOne('products', productId).then(x => { setProuct(x) });
    }, [productId]);

    return (
        <Card style={{ width: '80%',margin:'auto', display: 'flex',flexDirection:'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Card.Img variant="top" src={product.imageUrl} style={{ width: '45%'}} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    Category: {product.category}
                </Card.Text>
                <Card.Text>
                    Type: {product.type}
                </Card.Text>
                <Card.Text>
                    Description: {product.summary}
                </Card.Text>
                <Card.Text>
                    Price: {product.price}
                </Card.Text>
                {userIsOwner &&
                    <>
                        <Button className='m-1' variant="secondary" as={Link} to={`/products/edit/${product._id}`}>Edit</Button>
                        <Button variant="danger" as={Link} to={`/products/delete/${product._id}`}>Delete</Button>
                    </>
                }
            </Card.Body>
       
        </Card>
    );
}