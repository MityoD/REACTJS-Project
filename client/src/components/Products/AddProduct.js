import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { addTool } from '../../services/toolService';
export const AddProduct = () => {

    const { token } = useAuthContext();;
    const navigate = useNavigate();
    const onAddProductSubmit = async (data) => {
        try {
            const result = await addTool('/products', data, token);
            navigate('/products/all');
        } catch (error) {
            console.log('There is a problem');
        }
    };

    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        category: '',
        price: '',
        imageUrl: '',
        summary: ''
    }, onAddProductSubmit);

    return (
        <div style={{ width: '40%', margin: '50px auto' }}>
            <Form method="post" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}
                        placeholder="Enter title" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="category"
                        name="category"
                        value={values.category}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="price"
                        placeholder="price"
                        value={values.price}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                        type="Url"
                        name="imageUrl"
                        required
                        placeholder="price"
                        value={values.imageUrl}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                        type="text"
                        name="summary"
                        required
                        placeholder="summary"
                        value={values.summary}
                        onChange={changeHandler} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add product
                </Button>
            </Form>
        </div>
    );
}