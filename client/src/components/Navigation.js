import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


export const Navigation = () => {

  const { isAuthenticated, userEmail } = useContext(AuthContext);

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg" style={{marginBottom:"20px"}}>
      <Container>
        <Navbar.Brand as={Link} to="/">Solar Solutions</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products/all">Products</Nav.Link>
            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="/tools">Tools</Nav.Link>
            <Nav.Link as={Link} to="/contractors">Contractors</Nav.Link>
            <Nav.Link as={Link} to="/questions">Q&A</Nav.Link>
          </Nav>
          <Nav>
          {isAuthenticated ?
              <>
                <Nav.Link as={Link} to="/">{userEmail}</Nav.Link>
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
              </>
            :
              <>
                <Nav.Link  as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            }

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
