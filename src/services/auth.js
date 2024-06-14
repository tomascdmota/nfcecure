import axios from 'axios';

const BASE_URL = 'https://api.example.com';

// Function to authenticate user
const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

// Function to logout user
const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};

export { login, logout };
