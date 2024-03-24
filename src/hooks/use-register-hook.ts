import {useState} from "react";
import {useRouter} from "next/navigation";
import AuthService from "@/services/AuthService";
import {Values} from "@/store/hooks/form/store.interface";
import {AxiosError} from "axios";
import {RegisterFieldName} from "@/components/common/form-rows/register-form-row/register-form-row.enums";

export const useRegisterHook = () => {
    const [error, setError] = useState<string | undefined>();
    const router = useRouter();

    const register = async (values: Values<RegisterFieldName>, redirect?: string) => {
        try {
            const {username, email, password} = values;

            const response = await AuthService.registerUser({
                username,
                email,
                password,
            });

            if (response.status === 201) {
                router.push(redirect || '/');
            }
            return;
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e?.response?.data?.message);
                return;
            }
            console.error(e);
        }
        setError('Something went wrong. Please try again later.')
    };

    return {
        register,
        error,
    };
};