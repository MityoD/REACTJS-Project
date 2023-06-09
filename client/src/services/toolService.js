const baseUrl = 'http://localhost:3030/data';

export const addTool = async (url, data, token) => {
    const response = await fetch(`${baseUrl}/${url}`, {
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

export const getAll = async (url) => {
    const request = await fetch(baseUrl + url);
    const result = await request.json();
    return result;
}

export const getOne = async (url, id) => {
    const request = await fetch(`${baseUrl}/${url}/${id}`);
    const result = await request.json();
    return result;
}

export const getLastThree = async () => {
    const data = await getAll('/tools');
    return data.slice(-3);

}

export const edit = async (url, toolId, data, token) => {
    const request = await fetch(`${baseUrl}/${url}/${toolId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    });
    const result = await request.json();
    return result;
}

export const deleteTool = async (url, toolId, token) => {
    await fetch(`${baseUrl}/${url}/${toolId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
    });
}


export const likeTool = async (token, data) => {
    const request = await fetch(`${baseUrl}/likes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    });
    const result = await request.json();
    return result;
}

export const getLikes = async (toolId) => {
    const request = await fetch(`${baseUrl}/likes?where=toolId%3D%22${toolId}%22&count`);
    const result = await request.json();
    return result;
}

export const getLiked = async (userId, toolId) => {
    const request = await fetch(`${baseUrl}/likes?where=toolId%3D%22${toolId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    const result = await request.json();
    return !!result;
}

