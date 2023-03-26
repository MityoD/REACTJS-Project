const baseUrl = 'http://localhost:3030/data';
export const getAll = async (url) => {
    const request = await fetch(baseUrl + url);
    const result = await request.json();
    return result;
}

export const getOne = async (url,id) => {
    const request = await fetch(`${baseUrl}/${url}/${id}`);
    const result = await request.json();
    return result;
}

export const getLastThree = async () => {
    const data = await getAll('/tools');
    return data.slice(-3);

}


export const edit = async (url,toolId, data, token) => {
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


export const likeTool = async (token, data) => {
    const request = await fetch(`${baseUrl}/likes`,{
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
// GET /data/comments?where=recipeId%3D%228f414b4f-ab39-4d36-bedb-2ad69da9c830%22

export const getLikes = async (toolId) => {
    // console.log(toolId)
    const request = await fetch(`${baseUrl}/likes?where=toolId%3D%22${toolId}%22&count`);
    const result = await request.json();
    // console.log('---');
    // console.log(result)
    // console.log('---');
    // //&count
    return result;
}

export const getLiked = async (userId,toolId) => {
    // console.log(toolId)
    const request = await fetch(`${baseUrl}/likes?where=toolId%3D%22${toolId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    const result = await request.json();
    // console.log('canlike')
    // console.log(result)
    // console.log(!!result.length)

    return !!result;
}