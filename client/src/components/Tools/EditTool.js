import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { getOne } from '../../services/toolService';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { edit } from '../../services/toolService';
import { AccessDenied } from '../Shared/AccessDenied';

export const EditTool = () => {
    const { token, displayToast, userId } = useAuthContext();
    const navigate = useNavigate();
    const { toolId } = useParams();


    const onEditToolSubmit = async () => {
        try {
            await edit('tools', toolId, values, token);
            displayToast({ title: "Tool edited successfully!", show: true, bg: 'success' });
            navigate('/tools/my-tools');
        } catch (error) {
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
            navigate('/tools');
        }
    };


    const { values, changeHandler, onSubmit, changeValues } = useForm({
        title: '',
        category: '',
        type: '',
        price: '',
        imageUrl: '',
        summary: '',
    }, onEditToolSubmit);

    useEffect(() => {
        getOne('tools', toolId).then(x => { changeValues(x) });
    }, [toolId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <>
            {userId === values._ownerId ?
                <div style={{ width: '40%', margin: '50px auto' }}>
                    <Form method="PUT" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={changeHandler}
                                placeholder="Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Category"
                                name="Category"
                                value={values.category}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Type"
                                name="type"
                                value={values.type}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                min="0.01"
                                step="0.01"
                                placeholder="Price"
                                value={values.price}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control
                                type="Url"
                                name="imageUrl"
                                placeholder="Image Url"
                                value={values.imageUrl}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="summary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                                type="text"
                                name="summary"
                                placeholder="Summary"
                                value={values.summary}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Edit tool
                        </Button>
                    </Form>
                </div>
                :
                <AccessDenied />

            }
        </>



    );
}