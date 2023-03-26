import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';

export const Register = () => {

    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        role:'guest',
        confirmPassword: '',
    }, onRegisterSubmit);

    return (
        <div style={{ width: '40%', margin: '50px auto' }}>
            <Form method="post" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={values.confirmPassword}
                        onChange={changeHandler} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <hr/>
                <p>Or <Link to={'/login'}>login</Link> now.</p> 

            </Form>
        </div>

    );
}