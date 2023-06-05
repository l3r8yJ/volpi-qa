import {AxiosResponse} from "axios";
import {$api} from "../http/api";
import {AuthRequest, UserAuth} from "../types/Auth";

export class AuthService {
    static register(authRequest: AuthRequest): Promise<AxiosResponse<Omit<UserAuth, "isAuth">>> {
        return $api.post<Omit<UserAuth, "isAuth">>("/register", authRequest)
    }

    static auth(authRequest: AuthRequest): Promise<AxiosResponse<Omit<UserAuth, "isAuth">>>{
        return $api.post<Omit<UserAuth, "isAuth">>("/auth", authRequest)
    }
}