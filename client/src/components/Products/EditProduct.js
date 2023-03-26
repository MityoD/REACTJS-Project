import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { getOne } from '../../services/toolService';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { edit } from '../../services/toolService';

export const EditProduct = () => {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const { productId } = useParams();

    useEffect(() => {
        getOne('products', productId).then(x => { changeValues(x) });
    }, [productId]);
    

    const onEditProductSubmit = async () => {
        try {
            const result = await edit('products',productId, values, token);
            navigate(`/products/details/${productId}`);
        } catch (error) {
            console.log(error);
            console.log('There is a problem');
        }
    };
    

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        title: '',
        category: '',
        type:'',
        price: '',
        imageUrl:'',
        summary:'',
    }, onEditProductSubmit);

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
                        type="text"
                        name="price"
                        placeholder="price"
                        value={values.price}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                        type="text"
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
                   Edit product
                </Button>
            </Form>
        </div>

    );
}