import CONSTANTS from '../../../../constants';
import axiosInstance from "../index";


const authenticateUser = async (url, data) => {
    try {
        const response = await axiosInstance.post( url, data );
        const { data: { tokenPair } } = response;
        sessionStorage.setItem( CONSTANTS.ACCESS_TOKEN_KEY, tokenPair.accessToken );
        localStorage.setItem( CONSTANTS.REFRESH_TOKEN_KEY, tokenPair.refreshToken );
        return response;
    } catch (e) {
        throw e;
    }
};

export const signInUser = async data => authenticateUser( 'api/login', data );
export const signUpUser = async data => authenticateUser( 'api/sign_up', data );
export const signInUserByRefreshToken = async () => authenticateUser( 'api/refresh_sign_in', {  refreshToken: localStorage.getItem( CONSTANTS.REFRESH_TOKEN_KEY )});
export const refreshTokens = async () => authenticateUser( 'api/refresh_tokens', {
    refreshToken: localStorage.getItem( CONSTANTS.REFRESH_TOKEN_KEY )
} );

