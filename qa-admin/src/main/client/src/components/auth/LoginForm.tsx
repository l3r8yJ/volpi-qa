import {FC, FormEvent, useState} from "react"
import {ValidatedInput} from "../UI/ValidatedInput/ValidatedInput";
import {createValidateInputValueFunc} from "../../utils/createValidateInputValue/createValidateInputValueFunc";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";
import {BoltIcon} from "@heroicons/react/24/solid";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {auth} from "../../store/actions/authAction";
import {ExclamationTriangleIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {Loader} from "../UI/Loader";
import {LoaderSize} from "../../utils/getLoaderSizeByName";

const validateInputValue = createValidateInputValueFunc()

export const LoginForm: FC = () => {
    const [showValidation, setShowValidation] = useState(false)
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [username, setUsername] = useState("")
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [password, setPassword] = useState("")
    const {loading} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const formHandler = (e: FormEvent) => {
        e.preventDefault()
        if (!isUsernameValid || !isPasswordValid) return setShowValidation(true)
        dispatch(auth({username, password}))
    }

    return (
        <form className={"w-64 p-4 border border-base/50 rounded-lg flex flex-col"} onSubmit={formHandler}>
            {loading === "failed" &&
                <div className={"text-danger flex items-center justify-center py-2 gap-2"}>
                    <ExclamationTriangleIcon className={"w-5 h-5"}/>
                    <span>Что-то пошло не так</span>
                </div>
            }
            <div className={"space-y-4 flex flex-col"}>
                <ValidatedInput
                    validateFunc={validateInputValue}
                    setIsValid={setIsUsernameValid}
                    showValidation={showValidation}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label={"Логин"}
                    type={"text"}
                />
                <ValidatedInput
                    validateFunc={validateInputValue}
                    setIsValid={setIsPasswordValid}
                    showValidation={showValidation}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label={"Пароль"}
                    isPassword={true}
                />
            </div>
            <PrimaryButton type={"submit"} className={"flex items-center justify-center mt-8 min-h-[40px]"}>
                {loading === "pending"
                    ? <Loader size={LoaderSize.small}/>
                    : <>
                        <BoltIcon className={"w-5 h-5"}/>
                        <span className={"ml-2"}>Войти</span>
                    </>
                }

            </PrimaryButton>
        </form>
    );
};