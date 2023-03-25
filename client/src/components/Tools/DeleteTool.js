import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { deleteTool, getOne } from '../../services/toolService';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';



export const DeleteTool = () => {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const { toolId } = useParams();
    const [tool, setTool] = useState({});
    // const { userId, isAuthenticated } = useAuthContext();
    // const userIsOwner = userId === tool._ownerId;
    // console.log(userId);
    // console.log(isAuthenticated)

    useEffect(() => {
        getOne(toolId).then(x => { setTool(x) });
    }, [toolId]);


    const onDeleteToolSubmit = async () => {
        try {
            const result = await deleteTool(toolId, token);

            //setAuth(result);

            navigate('/tools/my-tools');
        } catch (error) {
            console.log(error);
            console.log('There is a problem');
        }
    };


    // const { values, changeHandler, onSubmit, changeValues } = useForm({
    //     title: '',
    //     brand: '',
    //     price: '',
    // }, onEditToolSubmit);

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        navigate(`/details/${toolId}`);
    }
    return (
        // <div style={{ width: '40%', margin: '50px auto' }}>
        //     <Form method="PUT" onSubmit={onSubmit}>
        //         <Form.Group className="mb-3" controlId="title">
        //             <Form.Label>Title</Form.Label>
        //             <Form.Control
        //                 type="text"
        //                 name="title"
        //                 value={values.title}
        //                 onChange={changeHandler}
        //                 placeholder="Enter title" />
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="brand">
        //             <Form.Label>Brand</Form.Label>
        //             <Form.Control
        //                 type="text"
        //                 placeholder="brand"
        //                 name="brand"
        //                 value={values.brand}
        //                 onChange={changeHandler} />
        //         </Form.Group>
        //         <Form.Group className="mb-3" controlId="price">
        //             <Form.Label>Price</Form.Label>
        //             <Form.Control
        //                 type="text"
        //                 name="price"
        //                 placeholder="price"
        //                 value={values.price}
        //                 onChange={changeHandler} />
        //         </Form.Group>
        //         <Button variant="primary" type="submit">
        //            Edit tool
        //         </Button>
        //     </Form>
        // </div>


        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you wan't to delete this tool?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ width: '40%', margin: 'auto' }}>
                        <Card.Img variant="top" src="https://media.screwfix.com/is/image/ae235/412XT_P?wid=414&hei=414&dpr=on" />
                        <Card.Body>
                            <Card.Title>{tool.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
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