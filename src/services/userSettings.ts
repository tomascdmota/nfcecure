import axios from "axios";

const BASE_URL = 'http://localhost:4001/user'

interface UserSettings {
    darkMode: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    username: string;
    email: string;
    phoneNumber: string;
    avatarUrl: string;
  }


const fetchUserSettings = async (access_token: string): Promise<UserSettings | undefined> => {
    try {
        const response = await axios.get(`${BASE_URL}/preferences`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        });
        return response.data
    } catch(error) {
        console.log("Error:", error)
        throw error;
    }
  }

  const updateUserSettings = async () => {}

  const uploadUserAvatar = async () => {}



  export default {fetchUserSettings, updateUserSettings, uploadUserAvatar};