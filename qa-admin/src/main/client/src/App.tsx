import {Header} from "./components/Header";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchCategories} from "./store/actions/categoryAction";

function App() {
    const dispatch = useAppDispatch()
    const {categories} = useAppSelector(state => state.category)
    useEffect(() => {
        dispatch(fetchCategories)
        console.log(categories)
    }, [])
    return (
        <div className={"text-white min-h-screen bg-neutral-800"}>
            <Header/>
            <main>

            </main>
        </div>
    )
}

export default App
