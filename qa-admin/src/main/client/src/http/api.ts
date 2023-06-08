import axios from "axios";
import {API_URL} from "../constants/api";


export const $api = axios.create({
    baseURL: API_URL
})



