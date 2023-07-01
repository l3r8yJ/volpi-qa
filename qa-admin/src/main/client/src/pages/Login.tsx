import {FC} from "react"
import {MainLayout} from "../components/layouts/MainLayout";
import {LoginForm} from "../components/auth/LoginForm";

const Login: FC = () => {
    return (
        <MainLayout isHeader={false} isFooter={false}>
            <div className={"min-h-screen flex flex-col items-center"}>
                <h1 className={"text-4xl font-semibold mb-10 mt-28"}>
                    Volpi-QA <span className={"text-accent-foreground"}>admin</span>
                </h1>
                <LoginForm/>
            </div>
        </MainLayout>
    );
};

export default Login