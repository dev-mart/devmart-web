import {useForm} from "@/store/hooks/form/store.hooks";
import {LoginFieldName} from "@/components/common/form-rows/login-form-row/login-form.row.enums";
import * as Validation from "@/helpers/validation.helper";
import {useLoginFormSubmitMiddleware} from "@/components/common/form-rows/login-form-row/login-form-submit-middleware.hook";

export const useLoginForm = (redirect: string) => {
    const {error, afterSubmitMiddleware} = useLoginFormSubmitMiddleware(redirect);

    const {
        fm,
        eventHandlers: {handleChange, handleBlur, handleSubmit},
    } = useForm(
        [LoginFieldName.username, LoginFieldName.password],
        {
            [LoginFieldName.username]: {
                rules: [
                    {
                        error: 'Username is required',
                        validator: Validation.hasValue
                    }
                ],
            },
            [LoginFieldName.password]: {
                rules: [
                    {
                        error: 'Password is required',
                        validator: Validation.hasValue
                    }
                ],
            }
        },
        {
            afterSubmitMiddleware
        }
    );

    return {
        fm,
        handleChange,
        handleBlur,
        handleSubmit,
        error
    }
}