import axios from 'axios';

const BASE_URL = "http://localhost:5225"

interface validateCode {
    valid?: boolean;
}

const validateCode = async (invitation_code: string, invitee_email: string): Promise<validateCode> => {
    try{
        const response = await axios.post<validateCode>(`${BASE_URL}/auth/validate`, {invitation_code, invitee_email})
        return response.data
    } catch(error){
        console.error("Code not valid: ", error);
        throw error;
    }
}

export {validateCode}