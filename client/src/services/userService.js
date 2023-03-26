const baseUrl = `http://localhost:3030/users`;

export const login = async (data) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
};

export const register = async (data) => {
    const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
};

export const logout = async (token) => {
    await fetch(`${baseUrl}/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        }
    })
};

