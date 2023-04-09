import { getOne } from "./toolService";

const baseUrl = 'http://localhost:3030/data/carts';

export const getUserCart = async (userId, token) => {
    var cart = await getCart(userId);
    if (!cart) {
        cart = await createCart({ items: [] }, token);
        return cart;
    }
    return cart;
}

export const addItemToCart = async (item, userId, itemId, token) => {

    const cart = await getUserCart(userId, token)

    const newItem = await getOne(item, itemId);

    if (cart?.items.some(x => x._id === itemId)) {
        return { status: 'existing' }
    }

    const items = [...cart.items, newItem];

    await addToCart(cart._id, items, token);
    return { status: 'added' }
}

export const addToCart = async (cartId, newItems, token) => {
    const request = await fetch(`${baseUrl}/${cartId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({ items: newItems })
    });
    const result = await request.json();
    return result;
}

const getCart = async (ownerId) => {
    const request = await fetch(`${baseUrl}?where=_ownerId%3D%22${ownerId}%22`);
    const result = await request.json();
    return result[0];
}

const createCart = async (data, token) => {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
};

export const sendOrder = async (data, token) => {
    const response = await fetch('http://localhost:3030/data/orders', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}

export const getUserOrders = async (ownerId) => {
    const request = await fetch(`http://localhost:3030/data/orders?where=_ownerId%3D%22${ownerId}%22`);
    const result = await request.json();
    return result;
}

//owner

export const getAllOrders = async () => {
    const response = await fetch('http://localhost:3030/data/orders')
    const orders = await response.json();
    return orders;
}

export const markOrder = async (orderId, data, token) => {
    const response = await fetch(`http://localhost:3030/data/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
            "X-Admin": true
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}



