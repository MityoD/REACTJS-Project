import { getOne } from "./toolService";

const baseUrl = 'http://localhost:3030/data/carts';

export const getUserCart = async (userId, token) => {
    var cart = await getCart(userId);
    if (cart.length === 0) {
        cart = await createCart({items: []}, token);    
       return cart;
    }
    return cart['0'];
}

   export const addItemToCart = async (userId, itemId, token) => {
    // check if item exist in cart
        const cart = await getCart(userId)

        const newItem = await getOne('tools',itemId);

        const items = [...cart[0].items, newItem];

        await addToCart(cart[0]._id, items, token);
    }




export const addToCart = async (cartId, newItems, token) => {
    const request = await fetch(`${baseUrl}/${cartId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify({items: newItems})
    });
    const result = await request.json();
    return result;
}
const getCart = async (ownerId) => {
    const request = await fetch(`${baseUrl}/likes?where=_ownerId%3D%22${ownerId}%22`);
    const result = await request.json();
    return result;
}

const createCart = async (data, token) => {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
};
//     const request = await fetch(`${baseUrl}/likes?where=toolId%3D%22${toolId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

export const sendOrder = async (data,token) => {
    const response = await fetch('http://localhost:3030/data/orders', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}

export const getUserOrders = async (ownerId) => {
    const request = await fetch(`http://localhost:3030/data/orders?where=_ownerId%3D%22${ownerId}%22`);
    const result = await request.json();
    console.log(result)
    return result;
}

// get the right orders




