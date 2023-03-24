const baseUrl = 'http://localhost:3030/data/tools';
export const getAll = async () => {
    const request = await fetch(baseUrl);
    const result = await request.json();
    return result;
}

export const getOne = async (toolId) => {
    const request = await fetch(`${baseUrl}/${toolId}`);
    const result = await request.json();
    return result;
}


export const edit = async (toolId, data, token) => {
    const request = await fetch(`${baseUrl}/${toolId}`, {
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