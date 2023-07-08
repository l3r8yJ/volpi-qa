import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline";
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
                    <button
                        className={`${isOpen ? "hidden" : ""} p-2.5 bg-gradient-to-br from-purple-700 to-sky-500 rounded-full shadow-lg shadow-sky-500/50 hover:shadow-xl hover:shadow-sky-600/50 duration-200 hover:scale-110`}
                        onClick={() => dispatch(setIsOpen(!isOpen))}
                    >
                        <ChatBubbleLeftRightIcon className={"w-9 h-9 text-white"}/>
                    </button>
                    <Modal>
                        <Suspense fallback={<Layout><Loader/></Layout>}>
                            <Chat/>
                        </Suspense>
                    </Modal>
                </div>
                :
                <>
                    <button
                        className={`${isOpen ? "hidden" : ""} absolute bottom-5 right-5 p-2.5 bg-gradient-to-br from-purple-700 to-sky-500 rounded-full shadow-lg shadow-sky-500/50 hover:shadow-xl hover:shadow-sky-600/50 duration-200 hover:scale-110`}
                        onClick={() => dispatch(setIsOpen(!isOpen))}
                    >
                        <ChatBubbleLeftRightIcon className={"w-9 h-9 text-white"}/>
                    </button>
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
