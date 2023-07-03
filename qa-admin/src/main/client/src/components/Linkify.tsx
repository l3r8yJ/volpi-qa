import {FC, useEffect, useRef} from "react"
import {parseLinks} from "../utils/parseLinks/parseLinks";

interface LinkifyProps {
    className?: string
    text: string
}

export const Linkify: FC<LinkifyProps> = ({className, text}) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current)
            ref.current.innerHTML = parseLinks(text) || "<div class='text-danger-foreground/60'>Скорее всего тут был скрипт, поэтому он был удалён 😳</div>"
    }, [text])

    return (
        <div
            ref={ref}
            className={className}
        ></div>
    );
};