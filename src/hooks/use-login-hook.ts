import {useState} from "react";
import {useRouter} from "next/navigation";
import AuthService from "@/services/AuthService";
import {Values} from "@/store/hooks/form/store.interface";
import {LoginFieldName} from "@/components/common/form-rows/login-form-row/login-form.row.enums";
import {AxiosError} from "axios";

export const useLoginHook = () => {
    const [error, setError] = useState<string | undefined>();
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
            }
            return;
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e?.response?.data?.message);
                return;
            }
        }
        setError('Something went wrong. Please try again later.')
    };

    return {
        login,
        error,
    };
};