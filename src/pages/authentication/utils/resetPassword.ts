import axios from 'axios'

const BASE_URL = 'http://localhost:5225'

interface resetPassword {
    status?: boolean;
}



const resetPassword = async(user_id:string, password: string): Promise<resetPassword> => {
    try {
        const response = await axios.post<resetPassword>(`${BASE_URL}/auth/reset-password`, {user_id, password})
        return response.data
    } catch(error) {
        console.error("The password could not be reset, try again later.", error);
        throw error;
    }
}

export {resetPassword}