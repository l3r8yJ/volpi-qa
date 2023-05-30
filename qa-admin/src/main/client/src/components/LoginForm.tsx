import {FC, FormEvent, useState} from "react"
import {ValidatedInput} from "./UI/ValidatedInput/ValidatedInput";
import {createValidateInputValueFunc} from "../utils/createValidateInputValue/createValidateInputValueFunc";
import {PrimaryButton} from "./UI/PrimaryButton/PrimaryButton";
import {BoltIcon} from "@heroicons/react/24/solid";

const validateInputValue = createValidateInputValueFunc()

export const LoginForm: FC = () => {
    const [showValidation, setShowValidation] = useState(false)
    const [isLoginValid, setIsLoginValid] = useState(false)
    const [login, setLogin] = useState("")
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [password, setPassword] = useState("")
    const formHandler = (e: FormEvent) => {
        e.preventDefault()
        if(!isLoginValid || !isPasswordValid) return setShowValidation(true)
    }
    return (
        <form className={"w-64 p-4 border border-neutral-500/50 rounded-lg flex flex-col"} onSubmit={formHandler}>
            <div className={"space-y-4 flex flex-col"}>
                <ValidatedInput
                    validateFunc={validateInputValue}
                    setIsValid={setIsLoginValid}
                    showValidation={showValidation}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    label={"Логин"}
                />
                <ValidatedInput
                    validateFunc={validateInputValue}
                    setIsValid={setIsPasswordValid}
                    showValidation={showValidation}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label={"Пароль"}
                />
            </div>
            <PrimaryButton type={"submit"} className={"flex items-center justify-center mt-8"}>
                <BoltIcon className={"w-5 h-5"}/>
                <span className={"ml-2"}>Войти</span>
            </PrimaryButton>
        </form>
    );
};