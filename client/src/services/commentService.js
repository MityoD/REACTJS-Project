const baseUrl = 'http://localhost:3030/data/comments';

export const getProjectComments = async (projectId) => {
    const request = await fetch(`${baseUrl}?where=_projectId%3D%22${projectId}%22`);
    const comments = await request.json();
    return comments;
}

export const addReply = async (commentId, _replays, token) => {
    const response = await fetch(`${baseUrl}/${commentId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
            "X-Admin": true
        },
        body: JSON.stringify(_replays)
    })
    const result = await response.json();
    return result;
}