import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as cartService from '../../services/orderService'
import Button from 'react-bootstrap/Button';


export const UserCartTable = () => {
    const { token, userId } = useAuthContext();

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        cartService.getUserCart(userId, token).then(x => setCartItems(x.items))
    }, [userId]);

    const removeFromCart = async (toolId) => {

        var cart = await cartService.getUserCart(userId);
        var items = cart.items.filter(x => x._id !== toolId)
        await cartService.addToCart(cart._id, items, token);
        setCartItems(items)
    }

    const checkout = async () => {
        await cartService.sendOrder({ order_items: cartItems }, token)
        var cart = await cartService.getUserCart(userId);
        await cartService.addToCart(cart._id, [], token); // send empty array
        setCartItems([])
    }


    // console.log(cartItems)
    return (
        <>
            {
                cartItems.length === 0
                    ?
                    <h5>You don't have items in the cart</h5>
                    :
                    <>
                        <Table striped bordered hover style={{ width: '80%', margin: 'auto' }}>
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
                                {cartItems.map(x =>
                                    <tr key={x._id}>
                                        <td><img style={{ width: '40px', borderRadius: '25px' }} src={x.imageUrl}></img></td>
                                        <td>{x.title}</td>
                                        <td>{x.category}</td>
                                        <td>{x.type}</td>
                                        <td>{x.price}</td>
                                        <td><Button style={{ margin: 'auto' }} variant="danger" onClick={() => removeFromCart(x._id)}>Remove</Button></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <Button style={{ width: '30%', marginLeft: '35%', marginTop: '20px' }} variant="primary" onClick={checkout}>Checkout</Button>
                    </>
            }
        </>
    );
}