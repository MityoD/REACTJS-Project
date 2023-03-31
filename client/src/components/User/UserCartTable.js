import Table from 'react-bootstrap/Table';
import { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as cartService from '../../services/orderService'
import Button from 'react-bootstrap/Button';
import { GMapComponent } from '../GMapComponent/GMapComponent'
import Form from 'react-bootstrap/Form'

export const UserCartTable = () => {
    const uname = "mityo91@gmail.com";
    const pword = "Contractors_Hub";

    const { token, userId, displayToast, userEmail } = useAuthContext();

    const [cartItems, setCartItems] = useState([]);
    const [cities, setCities] = useState([]);
    // const [cityId, setCityId] = useState('');
    const [offices, setOffices] = useState([]);
    const [officeAddress, setOfficeAddress] = useState('');
    const [markers, setMarkers] = useState([]);
    const [total, setTotal] = useState(0);

    const isInitialMount = useRef(true);

    useEffect(() => {
        cartService.getUserCart(userId, token).then(x => setCartItems(x.items));
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

    useEffect(() => {
        loadCities().then(x => { setCities(x) })
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

    const loadCities = async () => {


        const citiesData = await fetch(`https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getCities.json`, {
            method: "POST",
            headers: {
                "Authorization": "Basic " + (uname + ":" + pword),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ countryCode: "BGR" })
        });
        const data = await citiesData.json();
        const firstCities = data.cities.slice(0, 100);
        return firstCities

    }

    const selectedCity = (e) => {
        if (e.target.value !== 'defaultCity') {
            // setCityId(e.target.value)
            loadOffices(e.target.value)
        }
        setOffices([])
        setOfficeAddress('');
    }

    const loadOffices = async (_cityId) => {
        const offices = await fetch(`https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json`, {
            method: "POST",
            headers: {
                "Authorization": "Basic " + (uname + ":" + pword),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                countryCode: "BGR",
                cityID: _cityId
            })
        });
        const data = await offices.json();
        const newData = [];
        const _markers = [];
        data['offices'].forEach(x => newData.push(x.address))
        newData.forEach(x => _markers.push({lat : x.location.latitude, lng: x.location.longitude}))
        setMarkers(_markers)
        setOffices(newData)
        setOfficeAddress('');
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
                                        <td><img style={{ width: '40px', borderRadius: '30px' }} src={x.imageUrl}></img></td>
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
                            <GMapComponent markers={markers} sharedLocation={false}/>
                            <Table size="sm" variant="dark" striped bordered={false} style={{ height: '300px', textAlign: 'center', fontSize: '18px' }} hover >
                                <tbody>

                                    <tr>
                                        <td colSpan={2}>
                                            Select city:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <Form.Select size="lg" onChange={selectedCity}>
                                                <option value='defaultCity'>Select city..</option>
                                                {cities.map(x => <option value={x.id} key={x.nameEn}>{x.nameEn}</option>)}
                                                {/* {cities.map(x => <option value={`${x.nameEn}@${x.id}`} key={x.nameEn}>{x.nameEn}</option> )} */}
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
                                    <tr>
                                        <td colSpan={2}>radio : share location</td>
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