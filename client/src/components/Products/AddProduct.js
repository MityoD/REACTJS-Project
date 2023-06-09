import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { addTool } from '../../services/toolService';
export const AddProduct = () => {

    const { token, displayToast } = useAuthContext();;
    const navigate = useNavigate();
    const onAddProductSubmit = async (data) => {
        if(Object.values(data).some(x => x.toString().trim() === '')){
            displayToast({title:"Enter valid data", show:true, bg:'warning'})
            return;
        }
        try {
            await addTool('/products', data, token);
            displayToast({ title: "Product added successfully!", show: true, bg: 'success' });
            navigate('/products/all');
        } catch (error) {

            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
        }
    };

    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        category: '',
        price: '',
        imageUrl: '',
        summary: '',
        type:''
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
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={values.category}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Type"
                        name="type"
                        value={values.type}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="price"
                        placeholder="Price"
                        min="0.01" 
                        step="0.01"
                        value={values.price}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="imageUrl">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                        type="Url"
                        name="imageUrl"
                        required
                        placeholder="Image URL"
                        value={values.imageUrl}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="summary">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                        type="text"
                        name="summary"
                        required
                        placeholder="Summary"
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