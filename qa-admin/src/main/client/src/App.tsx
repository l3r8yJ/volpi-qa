import {Header} from "./components/Header";
import {CategoriesList} from "./components/CategoriesList";
import {Sidebar} from "./components/Sidebar";

function App() {
    return (
        <div className={"text-white min-h-screen bg-neutral-900"}>
            <Header/>
            <main className={"mx-5 lg:container lg:mx-auto mt-4"}>
                <Sidebar/>
                <div className={"ml-64 xl:ml-72"}>
                    <CategoriesList/>
                </div>
            </main>
        </div>
    )
}

export default App
