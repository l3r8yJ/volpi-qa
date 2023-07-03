import {FC} from "react"
import {parseLinks} from "../utils/parseLinks/parseLinks";
import DOMPurify from "dompurify";

interface LinkifyProps {
    className?: string
    text: string
}

export const Linkify: FC<LinkifyProps> = ({className, text}) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{__html: parseLinks(text) || "Текста нету 😢"}}
        />
    );
};