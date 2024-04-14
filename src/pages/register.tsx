"use client"

import React from 'react';
import {AuthCard} from "@/components/common/auth-card/auth-card";
import {DiscordAuthButton} from "@/components/common/discord-auth-button/discord-auth-button";
import {RegisterFieldName} from "@/components/common/form-rows/register-form-row/register-form-row.enums";
import {FormWrapper} from "@/components/common/form-wrapper/form-wrapper";
import {FieldsManager} from "@/store/hooks/fields-manager/fields-manager.interface";
import {ValidationError} from "@/components/common/form/validation-error/validation-error";
import Link from "next/link";
import {Button} from "@/components/common/button/button";
import {RegisterFormRow} from "@/components/common/form-rows/register-form-row/register-form-row";
import {GetServerSidePropsContext} from "next";
import {checkSession} from "@/helpers/auth.helper";
import {useSearchParams} from "next/navigation";
import {AuthLayout} from "@/layouts/auth-layout";
import {useRegisterForm} from "@/hooks/forms/use-register-form-hook";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    return await checkSession(context, false, true);
}

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const redirectUri = searchParams.get('redirect') as string || '/';

    const {
        fm,
        handleChange,
        handleBlur,
        handleSubmit,
        error,
        temporaryErrorField,
        correctedTemporaryError
    } = useRegisterForm(redirectUri);

    return (
        <AuthLayout>
            <AuthCard title="Sign Up." subtitle="Welcome to Devmart 👋">
                <FormWrapper onSubmit={handleSubmit}>
                    <DiscordAuthButton
                        label="Sign up with Discord"
                        href="/api/auth/discord/register"
                    />

                    <hr/>

                    <RegisterFormRow
                        fm={fm as FieldsManager<RegisterFieldName>}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    {error && !temporaryErrorField && !correctedTemporaryError && <ValidationError message={error.message}/>}

                    <div className="flex flex-col items-center justify-end mt-4">
                        <Button disabled={!fm.isSubmittable} type="submit">
                            {fm.hasBeenSubmitted ? 'Creating your account...' : 'Create account'}
                        </Button>
                    </div>
                    <div className="mt-4 text-center flex gap-2 justify-center items-center">
                        Already have an account?
                        <Link href="/login">Login in Now!</Link>
                    </div>
                </FormWrapper>
            </AuthCard>
        </AuthLayout>
    )
}