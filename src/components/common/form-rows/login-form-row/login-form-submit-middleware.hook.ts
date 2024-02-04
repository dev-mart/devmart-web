import {FormHooksSubmitMiddleware} from "@/store/hooks/form/store.interface";
import {LoginFieldName} from "@/components/common/form-rows/login-form-row/login-form.row.enums";
import {ApiError} from "@/models/rest/ApiError";
import {useLoginHook} from "@/hooks/use-login-hook";

interface LoginFormSubmitMiddlewareHook {
    error: ApiError | null;
    afterSubmitMiddleware: FormHooksSubmitMiddleware<LoginFieldName>
}

export const useLoginFormSubmitMiddleware: (
    redirect?: string
) => LoginFormSubmitMiddlewareHook = redirect => {
    const {login, error} = useLoginHook();

    return {
        error,
        afterSubmitMiddleware: (values, actions) => {
            login(values, redirect).then(() => actions.setHasBeenSubmitted(false));
        }
    }
}