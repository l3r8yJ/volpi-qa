import axios, {AxiosRequestHeaders} from "axios";
import {API_URL} from "../constants/api";


export const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (config.headers === undefined) {
        config.headers = {} as AxiosRequestHeaders;
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});
