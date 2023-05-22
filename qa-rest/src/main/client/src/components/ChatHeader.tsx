import {FC} from 'react';
import {useAppSelector} from "../hooks/redux";

export const ChatHeader: FC = () => {
    const {currentCategory} = useAppSelector(state => state.view)
    return (
        <div className={"p-4 text-xl text-white flex items-center justify-center bg-zinc-800"}>
            {currentCategory === null
                ? <h1>Поступи в ВПИ!</h1>
                : <h1>{currentCategory.name}</h1>
            }
        </div>
    );
}
