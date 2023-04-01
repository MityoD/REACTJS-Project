import { Button } from 'react-bootstrap';
import { getAllOrders } from '../../services/orderService'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { OrderImg } from "./OrderImg";
import { useAuthContext } from '../../contexts/AuthContext';
import { markOrder } from '../../services/orderService';


export const AllOrdersDetails = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getAllOrders().then(x => setOrders(x))
    }, [])

    const { token, displayToast } = useAuthContext();

    const markAsDispatched = async (id) => {
        const result = await markOrder(id, { "isDispatched": true }, token)   
        if (result.isDispatched) {
            setOrders(state => state.map(x => x._id === id ? result : x))
            displayToast({ title: `Order: ${id} status updated!`, show: true, bg: 'success' });
        } else {
            displayToast({ title: `Something went wrong!`, show: true, bg: 'warning' });
        }
    }

    return (
        <>
            {
                orders.length === 0
                    ?
                    <h5>No current orders</h5>
                    :
                    <Table variant="dark" striped bordered={false} hover style={{ width: '100%', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>UserID</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(x =>
                                <tr key={x._id}>
                                    <td>
                                        {x.order_items?.map(i => <OrderImg key={i._id} imageUrl={i.imageUrl} size={'40px'} />)}
                                    </td>
                                    <td>{x._id}</td>
                                    <td>{x.user}</td>
                                    <td>{x._ownerId}</td>
                                    <td>{x.office_address}</td>
                                    <td>{x.isDispatched ? 'Dispatched' : 'Pending'}</td>
                                    <td>{x.total_price}</td>
                                    <td>
                                        <Button
                                            disabled={x.isDispatched}
                                            variant='success'
                                            onClick={() => { markAsDispatched(x._id) }}>
                                            Mark as dispatched
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
            }
        </>
    );
};