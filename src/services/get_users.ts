import axios from 'axios'

const BASE_URL = 'http://localhost:4001/users';

interface GetUsersResponse {
    users?: string[];
}

const getUsers = async (): Promise<GetUsersResponse> => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            headers : {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data;
    }
    catch(err) {
        console.log("Error getting users", err)
        throw err;
    }
}

export default getUsers;