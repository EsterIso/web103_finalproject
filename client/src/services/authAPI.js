const API_BASE_URL = import.meta.env.VITE_API_URL;

async function createUser(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    console.log(data);
    return data;
}

async function loginUser(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Login failed');
    }
    
    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    console.log(data);
    return data;
}
export default {
    createUser,
    loginUser
}