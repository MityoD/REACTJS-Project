import { useState, useEffect } from "react"
import { getAll } from "../../services/toolService";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { Product } from "./Product";
import { Button } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
export const AllProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getAll('/products')
            .then(result => {
                setProducts(result)
            })
    }, []);

    const { role } = useAuthContext();
    var category = useLocation().pathname.split('/').slice(-1).toString();

    return (       
        <>
            {role === "owner" && <Button className="mb-3" as={Link} to={`/products/add`} variant="primary" style={{ marginLeft: "40px" }}>Add Product</Button>
            }
            <Container fluid={"sm"}>
                <Row className="g-0" style={{ rowGap:'30px'}}>

                    {
                        category === "all" ?

                            products.map(x => <Product key={x._id} {...x} role={role==="owner"}/>) :
                            products.filter(x => x['category'] === category).map(x => <Product key={x._id} {...x} role={role==="owner"}/>)
                    }


                </Row>
            </Container>
        </>

    )
}