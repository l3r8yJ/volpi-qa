import {FC} from 'react';
import {ChatHeader} from "./ChatHeader";
import {ChatOption} from "./ChatOption";
import {TextInputForm} from "./TextInputForm";

export const Chat: FC = () => {
    return (
        <div className={"min-w-[250px] w-[370px] rounded-lg overflow-hidden text-zinc-900 relative"}>
            <ChatHeader/>
            <div className={"h-[450px] p-4 space-y-4 overflow-y-auto bg-white"}>
                <div>
                    Здравствуйте! Я постараюсь вам помочь и найти ответы на вопросы связанные с поступлением в
                    наш Политех. <br/> Выберите категорию вопроса, который вас интересует:
                </div>
                <div className={"space-y-4"}>
                    <ChatOption/>
                    <ChatOption/>
                    <ChatOption/>
                    <ChatOption/>
                    <ChatOption/>
                </div>
            </div>
            <TextInputForm/>
        </div>
    );
}
