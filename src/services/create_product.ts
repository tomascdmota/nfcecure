import axios from 'axios';

const BASE_URL = 'http://localhost:4001/products';

interface CreateProductResponse {
    status?: string;
}

// Update createProduct to accept FormData directly
const createProduct = async (formData: FormData): Promise<CreateProductResponse> => {
    try {
        const response = await axios.post<CreateProductResponse>(`${BASE_URL}/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error creating product: ", error);
        throw error;
    }
};

export default createProduct;
