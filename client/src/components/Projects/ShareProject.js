import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate, Navigate } from 'react-router-dom';
import { addTool } from '../../services/toolService';
export const ShareProject = () => {

    const { token, displayToast, isAuthenticated } = useAuthContext();;
    const navigate = useNavigate();

    const onAddProjectSubmit = async (data) => {
        if (Object.values(data).some(x => x.toString().trim() === '')) {
            displayToast({ title: "Enter valid data", show: true, bg: 'warning' })
            return;
        }
        try {
            await addTool('/projects', data, token);
            displayToast({ title: "Project added successfully!", show: true, bg: 'success' });
            navigate('/projects');
        } catch (error) {

            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
        }
    };

    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        type: '',
        location: '',
        imageUrl: '',
        summary: ''
    }, onAddProjectSubmit);
    if (!isAuthenticated) {
        alert('Login to share your project')
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

                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="type"
                        name="type"
                        value={values.category}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="location"
                        placeholder="Location"
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
                <Form.Group className="mb-3" controlId="period">
                    <Form.Label>Period</Form.Label>
                    <Form.Control
                        type="text"
                        name="period"
                        required
                        placeholder="Period"
                        value={values.period}
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
                    Share your project
                </Button>
            </Form>
        </div >
    );
}