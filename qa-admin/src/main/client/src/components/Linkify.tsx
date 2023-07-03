import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, CSSProperties } from "react";
import { parseLinks } from "../utils/parseLinks/parseLinks";

interface LinkifyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text: string;
}

export const Linkify: FC<LinkifyProps> = ({ text, style, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML =
                parseLinks(text) ||
                "<div class='text-danger-foreground/60'>Скорее всего тут был скрипт, поэтому он был удалён 😳</div>";
        }
    }, [text]);

    return (
        <div
            {...props}
            ref={ref}
            style={style}
        ></div>
    );
};
