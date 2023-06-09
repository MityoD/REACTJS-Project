import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export const Login = () => {

    const { onLoginSubmit } = useAuthContext();

    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    return (
        <div style={{ width: '40%', margin: '50px auto' }}>
            <Form method='POST' onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        name={LoginFormKeys.Email}
                        value={values[LoginFormKeys.Email]}
                        onChange={changeHandler}
                        placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        required
                        name={LoginFormKeys.Password}
                        value={values[LoginFormKeys.Password]}
                        onChange={changeHandler}
                        placeholder="Password" />
                </Form.Group>
                <Button className="btn" variant="primary" type="submit">
                    Login
                </Button>
                <hr />
                <p>Or <Link to={'/register'}>register</Link> now.</p>
            </Form>

        </div>

    );
}