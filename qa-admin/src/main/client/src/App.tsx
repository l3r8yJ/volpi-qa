import {Header} from "./components/Header";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {
    createCategory,
    deleteCategory,
    fetchCategories,
    fetchCategoryByName,
    updateCategory
} from "./store/actions/categoryAction";

function App() {
    const [inputValue, setInputValue] = useState("")
    const ref = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const {categories} = useAppSelector(state => state.category)
    useEffect(() => {
        if (ref.current)
            ref.current.focus()
    }, [])
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (ref.current)
            setInputValue(ref.current.value)
    }

    return (
        <div className={"text-white min-h-screen bg-neutral-800"}>
            <Header/>
            <main className={"container mx-auto"}>
                <input className={"bg-neutral-900 p-2"} ref={ref} onChange={inputHandler}/>
                <div className={"flex space-x-2 mt-4"}>
                    <button
                        className={"bg-indigo-600 shadow-lg shadow-indigo-600/50 px-4 py-2 rounded hover:bg-indigo-700 duration-100"}
                        onClick={() => dispatch(fetchCategories())}>fetch all
                    </button>
                    <button
                        className={"bg-indigo-600 shadow-lg shadow-indigo-600/50 px-4 py-2 rounded hover:bg-indigo-700 duration-100"}
                        onClick={() => dispatch(fetchCategoryByName(inputValue))}>fetch by name
                    </button>
                    <button
                        className={"bg-indigo-600 shadow-lg shadow-indigo-600/50 px-4 py-2 rounded hover:bg-indigo-700 duration-100"}
                        onClick={() => dispatch(createCategory(inputValue))}>create
                    </button>
                    <button
                        className={"bg-indigo-600 shadow-lg shadow-indigo-600/50 px-4 py-2 rounded hover:bg-indigo-700 duration-100"}
                        onClick={() => dispatch(updateCategory({id: 0, name: inputValue, questions: []}))}>update
                    </button>
                    <button
                        className={"bg-indigo-600 shadow-lg shadow-indigo-600/50 px-4 py-2 rounded hover:bg-indigo-700 duration-100"}
                        onClick={() => dispatch(deleteCategory(inputValue as unknown as number))}>delete
                    </button>
                </div>
            </main>
        </div>
    )
}

export default App
