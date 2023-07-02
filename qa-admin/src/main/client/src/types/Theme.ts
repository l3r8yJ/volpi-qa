import { type FC } from "react"

type Icon = {
    className?:string
}

export type Theme = {
    id: string,
    title: "light" | "dark" | "system"
    Icon: FC<Icon>
}