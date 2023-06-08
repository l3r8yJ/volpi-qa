import {BrowserRouter as Router} from "react-router-dom"
import {AppRouter} from "./components/AppRouter";
import "./http/apiResInterceptors"

function App() {
    return (
        <Router>
            <AppRouter/>
        </Router>
    )
}

export default App
