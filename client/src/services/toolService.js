const baseUrl = 'http://localhost:3030/data';
export const getAll = async (url) => {
    const request = await fetch(baseUrl + url);
    const result = await request.json();
    return result;
}

export const getOne = async (toolId) => {
    const request = await fetch(`${baseUrl}/tools/${toolId}`);
    const result = await request.json();
    return result;
}

export const getLastThree = async () => {
    const data = await getAll('/tools');
    return data.slice(-3);

}


export const edit = async (toolId, data, token) => {
    const request = await fetch(`${baseUrl}/tools/${toolId}`, {
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

export const deleteTool = async (toolId, token) => {
    await fetch(`${baseUrl}/tools/${toolId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
    });
    // const result = await request.json();
    // return result;
}