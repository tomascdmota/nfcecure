import axios from 'axios'

const BASE_URL = 'http://localhost:5173/'

const ENDPOINTS = {
    products: `/product`,
    product_info: `/product/:productId`,
    dashboard: `/dashboard`
}

const get = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {params});
        return response.data;
    } catch(error) {
        console.log("Error:", error)
        throw error;
    }
}

const post = async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  };
  
  export { ENDPOINTS, get, post };
