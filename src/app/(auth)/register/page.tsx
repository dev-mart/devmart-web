"use client"

import React from 'react';
import {AuthCard} from "@/components/common/auth-card/auth-card";
import {DiscordAuthButton} from "@/components/common/discord-auth-button/discord-auth-button";
import {useForm} from "@/store/hooks/form/store.hooks";
import * as Validation from "@/helpers/validation.helper";
import {RegisterFieldName} from "@/components/common/form-rows/register-form-row/register-form-row.enums";
import {useRegisterFormSubmitMiddleware} from "@/components/common/form-rows/register-form-row/register-form-submit-middleware.hook";
import {FormWrapper} from "@/components/common/form-wrapper/form-wrapper";
import {FieldsManager} from "@/store/hooks/fields-manager/fields-manager.interface";
import {ValidationError} from "@/components/common/form/validation-error/validation-error";
import Link from "next/link";
import {Button} from "@/components/common/button/button";
import {RegisterFormRow} from "@/components/common/form-rows/register-form-row/register-form-row";

export default function RegisterPage({
                                      searchParams
                                  }: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const {error, afterSubmitMiddleware} = useRegisterFormSubmitMiddleware(searchParams['redirect'] as string);

    const {
        fm,
        eventHandlers: {handleChange, handleBlur, handleSubmit},
    } = useForm(
        [RegisterFieldName.username, RegisterFieldName.email, RegisterFieldName.password, RegisterFieldName.acceptTerms],
        {
            [RegisterFieldName.username]: {
                rules: [
                    {
                        error: 'Enter a valid username (a-z0-9_-)',
                        validator: Validation.isUsername
                    }
                ],
            },
            [RegisterFieldName.email]: {
                rules: [
                    {
                        error: 'Enter a valid email',
                        validator: Validation.isEmail
                    }
                ],
            },
            [RegisterFieldName.password]: {
                rules: [
                    {
                        error: 'Enter a valid password',
                        description: 'Must be 6-30 characters long and contain at least one number.',
                        validator: Validation.isPassword
                    }
                ],
            },
            [RegisterFieldName.acceptTerms]: {
                rules: [
                    {
                        error: 'You must accept the terms and conditions',
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

                {error && <ValidationError message={error}/>}

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
    )
}