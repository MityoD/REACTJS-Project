import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'  


export const Navigation = () => {

  const { isAuthenticated, userEmail, role } = useAuthContext();

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Solar Solutions</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products/all">Products</Nav.Link>
            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="/tools">Tools</Nav.Link>
            {role === 'owner' && <Nav.Link as={Link} to="/received-orders">Received orders</Nav.Link>}
          </Nav>
          <Nav>
            {isAuthenticated ?
              <>
                <Nav.Link as={Link} to="/user-cart-table"><FontAwesomeIcon icon={faCartShopping} /> {userEmail}</Nav.Link>
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
              </>
              :
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
