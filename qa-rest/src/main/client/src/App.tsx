import {Chat} from "./components/Chat";
import {Modal} from "./components/UI/Modal";
import {useState} from "react";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";

function App() {
    const isDevMode = process.env.NODE_ENV === 'development'
    const [chatVisible, setChatVisible] = useState(false)

    return (
        <>
            {isDevMode
                ?
                <div className={"flex flex-col items-center justify-center min-h-screen"}>
                    <button onClick={() => setChatVisible(!chatVisible)}>
                        <ChatBubbleBottomCenterTextIcon className={"w-10 h-10"}/>
                    </button>
                    <Modal
                        isOpen={chatVisible}
                        setIsOpen={setChatVisible}
                    >
                        <Chat/>
                    </Modal>
                </div>
                :
                <>
                    <button onClick={() => setChatVisible(!chatVisible)}>
                        <ChatBubbleBottomCenterTextIcon className={"w-10 h-10"}/>
                    </button>
                    <Modal
                        isOpen={chatVisible}
                        setIsOpen={setChatVisible}
                    >
                        <Chat/>
                    </Modal>
                </>
            }
        </>
    )
}

export default App
