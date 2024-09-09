import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const BASE_URL = 'http://localhost:5225/products'

interface CreateProductResponse {
    status?: string;
}

interface Product {
    name: string;
    description: string;    
    varieties: string;
    region: string;
    alcohol_content: number;
    format: string;
    grapes: string;
    serving_temperature: string;
    taste: string;
}

const createProduct = async (product: Product): Promise<CreateProductResponse> => {
    try{
        const response = await axios.post<CreateProductResponse>(`${BASE_URL}/createproduct`,product,{headers:{'Content-Type': "application/json", 'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
        return response.data
    }catch(error){
        console.log("Error creating product: ", error)
        throw error
    }
};

export default createProduct;