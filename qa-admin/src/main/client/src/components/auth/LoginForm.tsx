import {FC, FormEvent, useState} from "react"
import {ValidatedInput} from "../UI/ValidatedInput/ValidatedInput";
import {createValidateInputValueFunc} from "../../utils/createValidateInputValue/createValidateInputValueFunc";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";
import {BoltIcon} from "@heroicons/react/20/solid";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {auth} from "../../store/actions/authAction";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {Loader} from "../UI/Loader";
import {LoaderSize} from "../../utils/getLoaderSizeByName";
import {getErrorDescription} from "../../utils/getErrorDescription";
import {clearTheError} from "../../store/reducers/authSlice";

const validateInputValue = createValidateInputValueFunc()

export const LoginForm: FC = () => {
    const [showValidation, setShowValidation] = useState(false)
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [username, setUsername] = useState("")
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [password, setPassword] = useState("")
    const {loading, error} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const formHandler = (e: FormEvent) => {
        e.preventDefault()
        if (!isUsernameValid || !isPasswordValid) return setShowValidation(true)
        dispatch(auth({username, password}))
    }
    const inputClickHandler = () => {
        if (error) dispatch(clearTheError())
    }

    return (
        <form className={"w-80 px-4 py-6 border border-base/50 rounded-lg flex flex-col"} onSubmit={formHandler}>
            {loading === "failed" && error &&
                <div className={"text-danger flex items-center justify-center py-3 gap-2"}>
                    <ExclamationTriangleIcon className={"w-5 h-5"}/>
                    <span>{getErrorDescription(error)}</span>
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
                    onClick={inputClickHandler}
                />
                <ValidatedInput
                    validateFunc={validateInputValue}
                    setIsValid={setIsPasswordValid}
                    showValidation={showValidation}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label={"Пароль"}
                    isPassword={true}
                    onClick={inputClickHandler}
                />
            </div>
            <PrimaryButton type={"submit"} className={"flex items-center justify-center mt-8 min-h-[40px]"}>
                {loading === "pending"
                    ? <Loader size={LoaderSize.small}/>
                    : <>
                        <BoltIcon className={"w-4 h-4"}/>
                        <span className={"ml-2"}>Войти</span>
                    </>
                }

            </PrimaryButton>
        </form>
    );
};