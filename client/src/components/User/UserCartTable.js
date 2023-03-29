import Table from 'react-bootstrap/Table';
import { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as cartService from '../../services/orderService'
import Button from 'react-bootstrap/Button';


export const UserCartTable = () => {
    const { token, userId, displayToast } = useAuthContext();

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const isInitialMount = useRef(true);

    useEffect(() => {
        cartService.getUserCart(userId, token).then(x => setCartItems(x.items))
    }, [userId]);


    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            var price = 0;
            cartItems?.forEach(x => price += Number(x.price));
            setTotal(price);
        }
    });

    const removeFromCart = async (toolId) => {

        try {
            var cart = await cartService.getUserCart(userId);
            var items = cart.items.filter(x => x._id !== toolId)
            await cartService.addToCart(cart._id, items, token);
            setCartItems(items)
            displayToast({ title: "Item removed successfully!", show: true, bg: 'success' });
        } catch (error) {
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
        }
    };

    const checkout = async () => {

        try {
            await cartService.sendOrder({ order_items: cartItems }, token)
            var cart = await cartService.getUserCart(userId);
            await cartService.addToCart(cart._id, [], token); // send empty array
            setCartItems([])
            displayToast({ title: "Your order is sent!", show: true, bg: 'success' });
        } catch (error) {
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
        }
    }

    return (
        <>
            {
                cartItems?.length === 0
                    ?
                    <h5>You don't have items in the cart</h5>
                    :
                    <>
                        <Table size="sm" variant="dark" striped bordered={false} hover style={{ textAlign: 'center', width: '80%', margin: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems?.map(x =>
                                    <tr key={x._id}>
                                        <td><img style={{ width: '50px', borderRadius: '30px' }} src={x.imageUrl}></img></td>
                                        <td>{x.title}</td>
                                        <td>{x.category}</td>
                                        <td>{x.type}</td>
                                        <td>{x.price}</td>
                                        <td><Button style={{ margin: 'auto' }} variant="danger" onClick={() => removeFromCart(x._id)}>Remove</Button></td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total:</td>
                                    <td>{total}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </Table>
                        <Button style={{ width: '30%', marginLeft: '35%', marginTop: '20px' }} variant="primary" onClick={checkout}>Checkout</Button>
                    </>
            }
        </>
    );
}