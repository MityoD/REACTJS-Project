import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';


export const Tabs = () => {
    const location = useLocation().pathname;

    const { isAuthenticated } = useAuthContext();

    return (
        <Nav style={{ marginTop: '-20px', marginBottom: '20px', color: "grey" }} variant="tabs">

            {location.includes('products') &&
                <>
                    <Nav.Item>
                        <Nav.Link as={Link} to="products/all" style={{ color: "grey" }} >All Products</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="products/panels" style={{ color: "grey" }} >Solar panels</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="products/invertors" style={{ color: "grey" }} >Invertors</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="products/constructions" style={{ color: "grey" }} >Constructions</Nav.Link>
                    </Nav.Item>
                </>
            }

            {location.includes('tool') &&
                <>
                    <Nav.Item>
                        <Nav.Link as={Link} to="tools" style={{ color: "grey" }}>All tools</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="tools/add" style={{ color: "grey" }}>Add tool</Nav.Link>
                    </Nav.Item>
                    {isAuthenticated &&
                        <>
                            <Nav.Item>
                                <Nav.Link as={Link} to="tools/my-tools" style={{ color: "grey" }}>My tools</Nav.Link>
                            </Nav.Item>
                        </>}
                </>
            }


            {location.includes('user') &&
                <>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/user-cart-table" style={{ color: "grey" }} >Cart</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/user-orders" style={{ color: "grey" }} >Orders</Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                        <Nav.Link as={Link} to="/user-messages" style={{ color: "grey" }} >Messages</Nav.Link>
                    </Nav.Item> */}
                </>
            }
        </Nav>
    );
}

