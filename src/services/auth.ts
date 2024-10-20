import axios from 'axios';

const BASE_URL = 'http://localhost:4001';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // This is important to send cookies with requests
});

// Define types for the responses
interface LoginResponse {
  access_token?: string;
  // Add other properties if needed
}

interface LogoutResponse {
  message?: string; // Adjust based on your actual response
}

// Function to authenticate user
const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await instance.post<LoginResponse>('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

// Function to logout user
const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await instance.post<LogoutResponse>('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};

export { login, logout };
