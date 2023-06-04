import {Chat} from "./components/Chat";
import {Modal} from "./components/UI/Modal";
import {useState} from "react";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {setIsOpen} from "./store/reducers/modalSlice";

function App() {
    const isDevMode = process.env.NODE_ENV === 'development'
    const {isOpen} = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()

    return (
        <>
            {isDevMode
                ?
                <div className={"flex flex-col items-center justify-center min-h-screen"}>
                    <button onClick={() => dispatch(setIsOpen(!isOpen))}>
                        <ChatBubbleBottomCenterTextIcon className={"w-10 h-10"}/>
                    </button>
                    <Modal>
                        <Chat/>
                    </Modal>
                </div>
                :
                <>
                    <button onClick={() => dispatch(setIsOpen(!isOpen))}>
                        <ChatBubbleBottomCenterTextIcon className={"w-10 h-10"}/>
                    </button>
                    <Modal
                    >
                        <Chat/>
                    </Modal>
                </>
            }
        </>
    )
}

export default App
