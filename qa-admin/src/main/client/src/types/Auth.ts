export type UserAuth = {
    token: string | null
    isAuth: boolean
}

export type AuthRequest = {
    username: string
    password: string
}