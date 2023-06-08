import axios from "axios";
import {API_URL} from "../constants/api";
import {AxiosRequestHeaders} from "axios/index";


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




