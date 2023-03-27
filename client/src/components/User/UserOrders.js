import { getUserOrders } from "../../services/orderService";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export const UserOrders = () => {
    const { userId } = useAuthContext();
    const [orders, setOrders] = useState([])
    console.log(orders)
    useEffect(() => {
        getUserOrders(userId).then(x => { setOrders(x) })
    }, [])
    return (
        <>
            {
                orders.length === 0
                    ?
                    <h5>You don't have orders</h5>
                    :
                    <Table variant="dark" striped bordered hover style={{ width: '80%', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th>Id</th>                              
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(x =>
                                <tr key={x._id}>
                                    {/* <td><img style={{ width: '40px', borderRadius: '25px' }} src={x.imageUrl}></img></td>
                                    <td>{x.title}</td>
                                    <td>{x.category}</td>
                                    <td>{x.type}</td> */}
                                    <td>{x._id}</td>
                                    <td>{x._ownerId}</td>
                                    {/* <td><Button style={{ margin: 'auto' }} variant="danger" onClick={() => removeFromCart(x._id)}>Remove</Button></td> */}
                                </tr>
                            )}
                        </tbody>
                    </Table>
            }
            {/* <Button style={{ width: '30%', marginLeft: '35%', marginTop: '20px' }} variant="primary" onClick={checkout}>Checkout</Button> */}
        </>
    );
};


//add status for orders