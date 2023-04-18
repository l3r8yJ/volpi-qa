import {FC, InputHTMLAttributes} from 'react';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
        <input className={"px-4 py-2 rounded-lg outline-none bg-neutral-900"} {...props}/>
    );
}
