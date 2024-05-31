import axios from "axios";
const storeData = JSON.parse(localStorage.getItem('persist:root'));
const tokens = JSON.parse(storeData.authData).tokens;
const token = tokens.accessToken;
export const refreshToken = tokens.refreshToken;
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        Authorization: "Bearer " + token
    }
});

export default instance;