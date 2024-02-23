"use client"

import React from 'react';
import {DiscordAuthButton} from "@/components/common/discord-auth-button/discord-auth-button";
import {ValidationError} from "@/components/common/form/validation-error/validation-error";
import Link from "next/link";
import {Button} from "@/components/common/button/button";
import {AuthCard} from '@/components/common/auth-card/auth-card';
import {useForm} from "@/store/hooks/form/store.hooks";
import * as Validation from "@/helpers/validation.helper";
import {LoginFormRow} from "@/components/common/form-rows/login-form-row/login-form-row";
import {FieldsManager} from "@/store/hooks/fields-manager/fields-manager.interface";
import {LoginFieldName} from "@/components/common/form-rows/login-form-row/login-form.row.enums";
import {useLoginFormSubmitMiddleware} from "@/components/common/form-rows/login-form-row/login-form-submit-middleware.hook";
import {FormWrapper} from '@/components/common/form-wrapper/form-wrapper';

export default function LoginPage({
                                      searchParams
                                  }: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const {error, afterSubmitMiddleware} = useLoginFormSubmitMiddleware(searchParams['redirect'] as string);

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

    return (
        <AuthCard title="Login." subtitle="Hi, welcome back 👋">
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
                    <Link className="underline text-sm" href="/reset-password">Forgot your password?</Link>
                </div>

                <div className="flex flex-col items-center justify-end mt-4">
                    <Button disabled={!fm.isSubmittable} type="submit">
                        {fm.hasBeenSubmitted ? 'Logging you in...' : 'Log in'}
                    </Button>
                </div>
                <div className="mt-4 text-center flex gap-2 justify-center items-center">
                    No account yet?
                    <Link href="/register">Sign up Now!</Link>
                </div>
            </FormWrapper>
        </AuthCard>
    );
}