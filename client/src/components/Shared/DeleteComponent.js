import { deleteTool, getOne } from '../../services/toolService';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { AccessDenied } from './AccessDenied';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';



export const DeleteComponent = (
    {
        _item
    }
) => {

    const { token, displayToast, userId } = useAuthContext();
    const navigate = useNavigate();
    const { itemId } = useParams();
    const [item, setItem] = useState({});
    const route = _item === 'products' ? 'products/all' : `${_item}/my-${_item}`


    useEffect(() => {
        getOne(_item, itemId).then(x => { setItem(x) });
    }, [_item, itemId]);

    const onDeleteSubmit = async () => {

        try {
            await deleteTool(_item, itemId, token);
            displayToast({ title: "Item deleted successfully!", show: true, bg: 'success' });
            navigate(`/${route}`);
        } catch (error) {
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
            navigate(`/${route}`);
        }
    };

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        navigate(`/${route}`);
    }
    return (
        <>
            {userId !== item._ownerId ?

                <AccessDenied/>
                :
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
                            <Card.Img variant="top" src={item.imageUrl} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    {item.summary}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={onDeleteSubmit}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            }
        </>

    );
}