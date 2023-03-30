import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { getOne } from '../../services/toolService';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { edit } from '../../services/toolService';

export const EditTool = () => {
    const { token, displayToast } = useAuthContext();
    const navigate = useNavigate();
    const { toolId } = useParams();

    useEffect(() => {
        getOne('tools', toolId).then(x => { changeValues(x) });
    }, [toolId]);

    const onEditToolSubmit = async () => {
        try {
            const result = await edit('tools', toolId, values, token);
            displayToast({ title: "Item edited successfully!", show: true, bg: 'success' });
            navigate('/tools/my-tools');
        } catch (error) {
            console.log(error);
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
    return (
        <div style={{ width: '40%', margin: '50px auto' }}>
            <Form method="PUT" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}
                        placeholder="Enter title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="category"
                        name="category"
                        value={values.category}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="type"
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
                        placeholder="price"
                        value={values.price}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                        type="Url"
                        name="imageUrl"
                        placeholder="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                        type="text"
                        name="summary"
                        placeholder="summary"
                        value={values.summary}
                        onChange={changeHandler} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Edit tool
                </Button>
            </Form>
        </div>

    );
}