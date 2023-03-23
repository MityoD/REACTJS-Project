import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

export const AddTool = () => {

    const { onAddToolSubmit } = useContext(AuthContext);


    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        brand: '',
        price: '',
    }, onAddToolSubmit);

    return (
        <div style={{ width: '40%', margin: '50px auto' }}>
            <Form method="post" onSubmit={onSubmit}>
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
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="brand"
                        name="brand"
                        value={values.brand}
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
                <Button variant="primary" type="submit">
                    Add tool
                </Button>
            </Form>
        </div>

    );
}