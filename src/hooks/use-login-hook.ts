import {useState} from "react";
import {useRouter} from "next/navigation";
import {Values} from "@/store/hooks/form/store.interface";
import {LoginFieldName} from "@/components/common/form-rows/login-form-row/login-form.row.enums";
import {signIn} from "next-auth/react";

export const useLoginHook = () => {
    const [error, setError] = useState<string | undefined>();
    const router = useRouter();

    const login = async (values: Values<LoginFieldName>, redirect?: string) => {
        try {
            const signedIn = await signIn('credentials', {
                redirect: false,
                ...values
            });

            if (signedIn?.ok) {
                router.push(redirect || '/');
                return;
            }

            if (signedIn?.error === "CredentialsSignin") {
                setError('Invalid credentials. Please try again.');
                return;
            }

            setError('Something went wrong. Please try again later.');
            return;
        } catch (e) {
            setError('Something went wrong. Please try again later.')
        }
    };

    return {
        login,
        error,
    };
};