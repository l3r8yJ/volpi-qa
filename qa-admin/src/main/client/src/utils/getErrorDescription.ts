enum ErrorCode {
    ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE',
    ERR_NETWORK = 'ERR_NETWORK',
}

const ErrorDescription: Record<ErrorCode, string> = {
    [ErrorCode.ERR_BAD_RESPONSE]: 'Неправильный логин или пароль',
    [ErrorCode.ERR_NETWORK]: 'Ошибка сети',
};

export const getErrorDescription = (error: ErrorCode | string): string => {
    if (error in ErrorDescription) {
        return ErrorDescription[error as ErrorCode];
    } else {
        return `Неизвестная ошибка: ${error}`;
    }
};