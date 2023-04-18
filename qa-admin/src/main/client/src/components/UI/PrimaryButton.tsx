import {ButtonHTMLAttributes, FC} from 'react';

export const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({title, ...props}) => {
    return (
        <button className={"bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-600 w-full"} {...props}>
            {title}
        </button>
    );
}
