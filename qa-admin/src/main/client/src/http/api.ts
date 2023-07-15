import axios, {AxiosRequestConfig, AxiosRequestHeaders} from "axios";
import {API_URL} from "../constants/api";

export const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (config.headers === undefined) {
        config.headers = {} as AxiosRequestHeaders;
    }
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

if (import.meta.env.VITE_ENABLE_LOGGING === "true") {
    const logRequest = (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
        console.log('Request:', requestConfig.method?.toUpperCase(), requestConfig.url);
        console.log('Headers:', requestConfig.headers);
        if (requestConfig.data) console.log('Data:', requestConfig.data);
        return requestConfig;
    }
    //@ts-ignore
    $api.interceptors.request.use(logRequest);
}




