import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {setIsOpen} from "./store/reducers/modalSlice";
import {lazy, Suspense, useEffect} from "react";
import {Loader} from "./components/UI/Loader";
import {Layout} from "./components/Layout";

const Chat = lazy(() => import("./components/Chat"))
const Modal = lazy(() => import("./components/UI/Modal"))

function App() {
    const isDevMode = process.env.NODE_ENV === 'development'
    const {isOpen} = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()

    return (
        <>
            {isDevMode
                ?
                <div className={"flex flex-col items-center justify-center min-h-screen"}>
                    <button className={isOpen ? "hidden" : ""} onClick={() => dispatch(setIsOpen(!isOpen))}>
                        <ChatBubbleBottomCenterTextIcon className={"w-10 h-10"}/>
                    </button>
                    <Modal>
                        <Suspense fallback={<Layout><Loader/></Layout>}>
                            <Chat/>
                        </Suspense>
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
