import { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { GMapComponent } from '../GMapComponent/GMapComponent'
import * as cartService from '../../services/orderService'
import * as econtAPI from '../../services/econtAPIservice'

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

export const UserCartTable = () => {

    const [cartItems, setCartItems] = useState(null);
    const [cities, setCities] = useState([]);
    const [offices, setOffices] = useState([]);
    const [officeAddress, setOfficeAddress] = useState('');
    const [markers, setMarkers] = useState([]);
    const [total, setTotal] = useState(0);

    const isInitialMount = useRef(true);

    const { token, userId, displayToast, userEmail } = useAuthContext();

    useEffect(() => {
        cartService.getUserCart(userId, token).then(x => setCartItems(x.items));
    }, [userId, token]);


    useEffect(() => {
        var price = 0;
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            cartItems?.forEach(x => price += Number(x.price));
            setTotal(price);
        }
    }, [cartItems]);

    useEffect(() => {
        econtAPI.loadCities().then(x => { setCities(x) })
    }, [])

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

    const selectedCity = async (e) => {
        setOfficeAddress('');
        if (e.target.value !== 'defaultCity') {
            const _offices = await econtAPI.loadOffices(e.target.value)
            setOffices(_offices[0])
            setMarkers(_offices[1])    
            return;        
        }
        setOffices([])
    }  

    const selectedOffice = (e) => {
        if (e.target.value !== 'defaultOffice') {
            setOfficeAddress(e.target.value)
        } else {
            setOfficeAddress('')
        }
    }

    const checkout = async () => {
        if (officeAddress === '') {
            displayToast({ title: "Select delivery address.", show: true, bg: 'warning' });
            return
        }
        try {
            await cartService.sendOrder({
                order_items: cartItems,
                user: userEmail,
                office_address: officeAddress,
                total_price: total,
                isDispatched: false
            }, token)
            var cart = await cartService.getUserCart(userId);
            await cartService.addToCart(cart._id, [], token);
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
                    <h2 style={{ textAlign: 'center' }}>You don't have items in the cart</h2>
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
                                        <td><img style={{ width: '40px', borderRadius: '30px' }} src={x.imageUrl} alt={'alt'}></img></td>
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
                                <tr>
                                    <td colSpan={6} style={{ fontSize: '18px' }}>Select your delivery address:</td>
                                </tr>
                            </tfoot>
                        </Table>

                        <div style={{ display: 'flex', width: '80%', margin: 'auto' }}>
                            <GMapComponent markers={markers} />
                            <Table size="sm" variant="dark" striped bordered={false} style={{ height: '355px', alignItems: 'center', textAlign: 'center', fontSize: '18px', width: '70%' }} hover >
                                <tbody>

                                    <tr>
                                        <td style={{verticalAlign:'middle'}} colSpan={2}>
                                            Select city:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <Form.Select size="lg" onChange={selectedCity}>
                                                <option value='defaultCity'>Select city..</option>
                                                {cities.map(x => <option value={x.id} key={x.nameEn}>{x.nameEn}</option>)}
                                            </Form.Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>Select Econt office:</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <Form.Select size="lg" onChange={selectedOffice} >
                                                <option value='defaultOffice'>Select Econt office</option>
                                                {offices.length !== 0
                                                    &&
                                                    offices.map(x => <option key={x.fullAddressEn}>{x.fullAddressEn}</option>)
                                                }
                                            </Form.Select>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3}>
                                            <Button style={{ width: '100%', margin: 'auto' }} variant="primary" onClick={checkout}>Checkout</Button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                    </>
            }
        </>
    );
}