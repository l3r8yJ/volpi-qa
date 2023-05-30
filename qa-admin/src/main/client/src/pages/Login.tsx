import {FC} from "react"
import {MainLayout} from "../components/layouts/MainLayout";
import {ValidatedInput} from "../components/UI/ValidatedInput/ValidatedInput";

const Login: FC = () => {
    return (
        <MainLayout isHeader={false}>
            <div className={"min-h-screen flex flex-col justify-center items-center"}>
                <h1 className={"text-3xl font-semibold"}>
                    Volpi-QA <span className={"text-indigo-600"}>admin</span>
                </h1>
            </div>
        </MainLayout>
    );
};

export default Login