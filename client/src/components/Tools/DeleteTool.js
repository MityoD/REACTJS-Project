import { deleteTool, getOne } from '../../services/toolService';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';



export const DeleteTool = () => {

    const { token, displayToast} = useAuthContext();
    const navigate = useNavigate();
    const { toolId } = useParams();
    const [tool, setTool] = useState({});

    useEffect(() => {
        getOne('tools', toolId).then(x => { setTool(x) });
    }, [toolId]);


    const onDeleteToolSubmit = async () => {
        try {
            await deleteTool('tools', toolId, token);
            displayToast({ title: "Tool deleted successfully!", show: true, bg: 'success' });
            navigate('/tools/my-tools');
        } catch (error) {
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
            navigate('/tools');
        }
    };

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        navigate(`/tools/details/${toolId}`);
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
                        <Card.Img variant="top" src={tool.imageUrl} />
                        <Card.Body>
                            <Card.Title>{tool.title}</Card.Title>
                            <Card.Text>
                                {tool.summary}
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