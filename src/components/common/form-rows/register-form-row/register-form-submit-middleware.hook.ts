import {FormHooksSubmitMiddleware} from "@/store/hooks/form/store.interface";
import {LoginFieldName} from "@/components/common/form-rows/login-form-row/login-form.row.enums";
import {ApiError} from "@/models/rest/ApiError";
import {useLoginHook} from "@/hooks/use-login-hook";
import {RegisterFieldName} from "@/components/common/form-rows/register-form-row/register-form-row.enums";
import {useRegisterHook} from "@/hooks/use-register-hook";

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