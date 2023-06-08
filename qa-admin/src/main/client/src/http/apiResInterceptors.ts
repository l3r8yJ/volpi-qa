import {store} from "../store/store";
import {setTokenInvalid, signOut} from "../store/reducers/authSlice";
import {$api} from "./api";

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
