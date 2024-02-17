'use server';

import {signIn} from "@/services/auth.service";
import {AuthError} from "next-auth";

export async function authenticate(
    callbackUrl: string | undefined,
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials', {
            callbackUrl: callbackUrl || '/',
            username: formData.get('username'),
            password: formData.get('password')
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default:
                    return 'Something went wrong';
            }
        }
        throw error;
    }
}