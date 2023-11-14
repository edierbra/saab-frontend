import axios from "axios";

const saabApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/saab`
})

saabApi.interceptors.request.use(config => {
    config.headers={
        ...config.headers,
        "Authorization": sessionStorage.getItem('token'),
    }
    return config;
})

export default saabApi;