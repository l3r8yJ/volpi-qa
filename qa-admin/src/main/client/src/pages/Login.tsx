import {FC} from "react"
import {MainLayout} from "../components/layouts/MainLayout";
import {ValidatedInput} from "../components/UI/ValidatedInput/ValidatedInput";
import {LoginForm} from "../components/LoginForm";

const Login: FC = () => {
    return (
        <MainLayout isHeader={false}>
            <div className={"min-h-screen flex flex-col justify-center items-center"}>
                <h1 className={"text-4xl font-semibold mb-10"}>
                    Volpi-QA <span className={"text-indigo-600"}>admin</span>
                </h1>
                <LoginForm/>
            </div>
        </MainLayout>
    );
};

export default Login