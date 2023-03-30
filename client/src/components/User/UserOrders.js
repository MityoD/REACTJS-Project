import { getUserOrders } from "../../services/orderService";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import Table from 'react-bootstrap/Table';
import { OrderImg } from "./OrderImg";

export const UserOrders = () => {
    const { userId } = useAuthContext();
    const [orders, setOrders] = useState([])
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
                    <Table variant="dark" striped bordered={false} hover style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
                        <thead>
                            <tr>

                                <th>Items</th>
                                <th>Id</th>
                                <th>Address</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(x =>
                                <tr key={x._id}>
                                    <td>
                                        {x.order_items.map(i => <OrderImg key={i._id} imageUrl={i.imageUrl} size={'40px'}/>)}
                                    </td>
                                    <td>{x._id}</td>
                                    <td>{x.office_address}</td>
                                    <td>{x.total_price}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
            }
        </>
    );
};

//add status for orders