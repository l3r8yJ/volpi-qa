import {Chat} from "./components/Chat";

function App() {
    const isDevMode = process.env.NODE_ENV === 'development'

    return (
        <>
            {isDevMode
                ?
                <div className={"flex items-center justify-center h-screen"}>
                    <Chat/>
                </div>
                : <Chat/>
            }
        </>
    )
}

export default App
