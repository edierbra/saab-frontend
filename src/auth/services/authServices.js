import axios from "axios"

export const loginUser = async ({ username, password }) => { // podria tener en como parametros un nombre cualquiera: loginUser = (userLogin) 
    try {
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, // y acceder de la forma userLogin.username
            {
                username,
                password
            }
        )
    } catch (error) {
        throw error;
    }
}