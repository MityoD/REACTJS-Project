import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from 'react-router-dom';
import { addTool } from '../../services/toolService';

export const AddTool = () => {

    const {  isAuthenticated, token, displayToast } = useAuthContext();;
    
    const navigate = useNavigate();

    const onAddToolSubmit = async (data) => {
        try {
            await addTool('/tools', data, token);
            displayToast({title:"Tool added successfully!", show:true, bg:'success'})
            navigate('/tools/my-tools');
        } catch (error) {
            displayToast({title:"Something went wrong", show:true, bg:'danger'})
        }
    };

    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        category: '',
        type:'',
        price: '',
        imageUrl:'',
        summary:'',
    }, onAddToolSubmit);

    if (!isAuthenticated) {
        alert('Login to add tool')
        return (
            <Navigate to="/login" />
        )
    }
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
                        placeholder="category"
                        name="category"
                        value={values.category}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="type"
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
                        min="0.01" 
                        step="0.01"
                        placeholder="price"
                        value={values.price}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="imageUrl">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                        required
                        type="Url"
                        name="imageUrl"
                        placeholder="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="summary">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="summary"
                        placeholder="summary"
                        value={values.summary}
                        onChange={changeHandler} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add tool
                </Button>
            </Form>
        </div>
    );
}