import axios from "axios";

const saabApiReportesExcel = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/saab`
})

saabApiReportesExcel.interceptors.request.use(config => {
    config.responseType = 'blob',
    // config.headers['Authorization'] = sessionStorage.getItem('token');
    // config.headers['Content-Type'] = 'application/octet-stream';
    config.headers = {
        ...config.headers,
        "Authorization": sessionStorage.getItem('token'),
        'Content-Type': 'application/octet-stream',
    }
    return config;
})

export default saabApiReportesExcel;