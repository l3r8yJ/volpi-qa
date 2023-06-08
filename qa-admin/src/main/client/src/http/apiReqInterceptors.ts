import {$api} from "./api";
import {AxiosRequestHeaders} from "axios"

$api.interceptors.request.use((config) => {
    if (config.headers === undefined) {
        config.headers = {} as AxiosRequestHeaders;
    }
    const token = localStorage.getItem("token")
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
