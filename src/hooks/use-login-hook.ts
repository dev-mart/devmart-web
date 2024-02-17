import {useState} from "react";
import {ApiError} from "@/models/rest/ApiError";
import {useRouter} from "next/navigation";
import AuthService from "@/services/AuthService";
import {FormHooksSubmitMiddleware, Values} from "@/store/hooks/form/store.interface";
import {LoginFieldName} from "@/components/common/form-rows/login-form-row/login-form.row.enums";
import {authenticate} from "@/actions/auth.actions";

export const useLoginHook = () => {
    const [error, setError] = useState<ApiError | null>(null);
    const router = useRouter();

    const login = async (values: Values<LoginFieldName>, redirect?: string) => {
        try {
            const {username, password} = values;

            const response = await AuthService.login({
                username,
                password,
            });

            if (response.status === 200) {
                router.push(redirect || '/');
            } else {
                setError(response.data);
            }
        } catch (e) {
            setError({
                errorCode: 500,
                message: 'Something went wrong. Please try again later.',
            });
        }
    };

    return {
        login,
        error,
    };
};