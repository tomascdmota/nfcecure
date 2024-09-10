import axios from 'axios'

const BASE_URL = 'https://localhost:5225'

interface validateEmail {
    user_id?: boolean;
}


const validateEmail = async(email:string): Promise<validateEmail> => {
   try { const response = await axios.post(`${BASE_URL}/auth/validate-email`,{email})
    return response.data;
    }catch(error){
        console.error("This email doesn't exist in our database", error);
        throw error;
    }
}


export {validateEmail}