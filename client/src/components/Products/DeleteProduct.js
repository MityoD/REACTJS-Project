import Button from 'react-bootstrap/Button';
import { deleteTool, getOne } from '../../services/toolService';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';



export const DeleteProduct = () => {
    const { token, displayToast } = useAuthContext();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        getOne('products',productId).then(x => { setProduct(x) });
    }, [productId]);


    const onDeleteToolSubmit = async () => {
        try {
            await deleteTool('products', productId, token);
            displayToast({ title: "Tool deleted successfully!", show: true, bg: 'success' });
            navigate('/products/all');
        } catch (error) {
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
        }
    };

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        navigate(`/products/details/${productId}`);
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you wan't to delete this?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ width: '40%', margin: 'auto' }}>
                        <Card.Img variant="top" src={product.imageUrl} />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>
                                {product.summary}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onDeleteToolSubmit}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}