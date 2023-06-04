import {AxiosResponse} from "axios";
import {$api} from "../http/api";
import {AuthRequest} from "../types/Auth";

export class AuthService {
    static register(authRequest: AuthRequest): Promise<AxiosResponse<string>> {
        return $api.post<string>("/register", authRequest)
    }

    static auth(authRequest: AuthRequest): Promise<AxiosResponse<string>>{
        return $api.post<string>("/auth", authRequest)
    }
}