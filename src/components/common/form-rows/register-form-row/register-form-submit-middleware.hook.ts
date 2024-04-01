import {FormHooksSubmitMiddleware} from "@/store/hooks/form/store.interface";
import {RegisterFieldName} from "@/components/common/form-rows/register-form-row/register-form-row.enums";
import {useRegisterHook} from "@/hooks/use-register-hook";
import {ApiError} from "@/interfaces/api.interface";

interface RegisterFormSubmitMiddlewareHook {
    error?: ApiError;
    afterSubmitMiddleware: FormHooksSubmitMiddleware<RegisterFieldName>
}

export const useRegisterFormSubmitMiddleware: (
    redirect?: string
) => RegisterFormSubmitMiddlewareHook = redirect => {
    const {error, register} = useRegisterHook();

    return {
        error: error,
        afterSubmitMiddleware: (values, actions) => {
            register(values, redirect).then(() => actions.setHasBeenSubmitted(false));
        }
    }
}