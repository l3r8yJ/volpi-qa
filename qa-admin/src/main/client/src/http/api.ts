import axios, {AxiosRequestHeaders} from "axios";
import {API_URL} from "../constants/api";
import {store} from "../store/store";
import {setTokenInvalid, signOut} from "../store/reducers/authSlice";


export const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (config.headers === undefined) {
        config.headers = {} as AxiosRequestHeaders;
    }
    const token = localStorage.getItem("token")
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

$api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            store.dispatch(setTokenInvalid());
            store.dispatch(signOut())
        }
        return Promise.reject(error);
    }
);

