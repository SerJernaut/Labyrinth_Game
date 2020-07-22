import CONSTANTS from "../../../constants";
import {refreshTokens} from "../axios/authController";
import axios from 'axios';


const axiosInstance = axios.create({baseURL: CONSTANTS.REST_API_URL});


axiosInstance.interceptors.request.use( config => {
    config.headers.authorization = sessionStorage.getItem( CONSTANTS.ACCESS_TOKEN_KEY );
    return config;
}, (err) => Promise.reject(err));


axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const { response: { status }, config } = error;
        switch (status) {
            case 419: {
                await refreshTokens();
                return axiosInstance.request( config );
            }
            default:
                throw error;
        }
    }
);


export default axiosInstance;