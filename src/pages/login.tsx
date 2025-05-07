"use client"

import {LoginFieldName} from "@/components/common/form-rows/login-form-row/login-form.row.enums";
import {AuthCard} from "@/components/common/auth-card/auth-card";
import {Alert} from "flowbite-react";
import {HiCheckCircle} from "react-icons/hi2";
import {FormWrapper} from "@/components/common/form-wrapper/form-wrapper";
import {DiscordAuthButton} from "@/components/common/discord-auth-button/discord-auth-button";
import {LoginFormRow} from "@/components/common/form-rows/login-form-row/login-form-row";
import {FieldsManager} from "@/store/hooks/fields-manager/fields-manager.interface";
import {ValidationError} from "@/components/common/form/validation-error/validation-error";
import Link from "next/link";
import {Button} from "@/components/common/button/button";
import React from "react";
import {useSearchParams} from "next/navigation";
import {AuthLayout} from "@/layouts/auth-layout";
import {GetServerSidePropsContext} from "next";
import {checkSession} from "@/helpers/auth.helper";
import {useLoginForm} from "@/hooks/forms/use-login-form-hook";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    return await checkSession(context, false, true);
}

export default function LoginPage() {
    const searchParams = useSearchParams();
    const redirectUri = searchParams.get('redirect') as string || '/';

    const {
        fm,
        handleChange,
        handleBlur,
        handleSubmit,
        error
    } = useLoginForm(redirectUri);

    return (
        <AuthLayout>
            <AuthCard
                title="Login."
                subtitle="Hi, welcome back 👋"
                prefixNode={
                    searchParams.get('registered') == '1' && (
                        <div className="mb-4 w-full sm:max-w-md px-6">
                            <Alert color="success" icon={HiCheckCircle}>
                                Your account has successfully been created. You can now log in!
                            </Alert>
                        </div>
                    )
                }>

                <FormWrapper onSubmit={handleSubmit}>
                    <DiscordAuthButton
                        label="Login with Discord"
                        href="/api/auth/discord/login"
                    />

                    <hr/>

                    <LoginFormRow
                        fm={fm as FieldsManager<LoginFieldName>}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    {error && <ValidationError message={error}/>}

                    <div className="flex flex-row mt-2 center justify-between">
                        <Link className="underline text-sm text-theme-500 font-semibold" href="/reset-password">Forgot your password?</Link>
                    </div>

                    <div className="flex flex-col items-center justify-end mt-4">
                        <Button disabled={!fm.isSubmittable} type="submit" fullWidth>
                            {fm.hasBeenSubmitted ? 'Logging you in...' : 'Log in'}
                        </Button>
                    </div>
                    <div className="mt-4 text-center flex gap-2 justify-center items-center">
                        No account yet?
                        <Link href="/register" className="text-theme-500 font-semibold">Sign up Now!</Link>
                    </div>
                </FormWrapper>
            </AuthCard>
        </AuthLayout>
    );
}