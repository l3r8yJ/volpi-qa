import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {setIsOpen} from "./store/reducers/modalSlice";
import {lazy, Suspense} from "react";
import {Loader} from "./components/UI/Loader";
import {Layout} from "./components/Layout";
import {Modal} from "./components/UI/Modal";

const Chat = lazy(() => import("./components/Chat"))

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
                    <div className={"absolute bottom-5 right-5"}>
                    <button className={isOpen ? "hidden" : ""} onClick={() => dispatch(setIsOpen(!isOpen))}>
                        <ChatBubbleBottomCenterTextIcon className={"w-10 h-10"}/>
                    </button>
                    </div>
                    <Modal>
                        <Suspense fallback={<Layout><Loader/></Layout>}>
                            <Chat/>
                        </Suspense>
                    </Modal>
                </>
            }
        </>
    )
}

export default App
