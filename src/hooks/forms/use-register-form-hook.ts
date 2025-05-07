import {useForm} from "@/store/hooks/form/store.hooks";
import * as Validation from "@/helpers/validation.helper";
import {useRegisterFormSubmitMiddleware} from "@/components/common/form-rows/register-form-row/register-form-submit-middleware.hook";
import {RegisterFieldName} from "@/components/common/form-rows/register-form-row/register-form-row.enums";
import React, {useEffect} from "react";
import {ApiErrorCodes} from "@/constants/api-errors";

export const useRegisterForm = (redirect: string) => {
    const {error, afterSubmitMiddleware} = useRegisterFormSubmitMiddleware(redirect);
    const [temporaryErrorField, setTemporaryErrorField] = React.useState<RegisterFieldName | null>(null);
    const [correctedTemporaryError, setCorrectedTemporaryError] = React.useState<boolean>(false);

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
                    },
                    {
                        error: 'Username is already taken',
                        validator: () => temporaryErrorField !== RegisterFieldName.username
                    }
                ],
            },
            [RegisterFieldName.email]: {
                rules: [
                    {
                        error: 'Enter a valid email',
                        validator: Validation.isEmail
                    },
                    {
                        error: 'Email is already taken',
                        validator: () => temporaryErrorField !== RegisterFieldName.email
                    }
                ],
            },
            [RegisterFieldName.password]: {
                rules: [
                    {
                        error: 'Enter a valid password',
                        description: 'Must be 6-30 characters long and contain at least one number.',
                        validator: Validation.isPassword,
                    }
                ],
            },
            [RegisterFieldName.acceptTerms]: {
                rules: [
                    {
                        error: 'You must accept the terms and conditions',
                        validator: Validation.isEqual('1')
                    }
                ],
            }
        },
        {
            afterChangeMiddleware: (values) => {
                if (temporaryErrorField && temporaryErrorField === values) {
                    setCorrectedTemporaryError(true)
                    setTemporaryErrorField(null)
                }
            },
            afterSubmitMiddleware,
        }
    );

    useEffect(() => {
        if (error) {
            if (error.errorCode === ApiErrorCodes.USERNAME_TAKEN) {
                setTemporaryErrorField(RegisterFieldName.username);
                setCorrectedTemporaryError(false)
            } else if (error.errorCode === ApiErrorCodes.EMAIL_TAKEN) {
                setTemporaryErrorField(RegisterFieldName.email);
                setCorrectedTemporaryError(false)
            }
        }
    }, [error])

    return {
        fm,
        handleChange,
        handleBlur,
        handleSubmit,
        error,
        temporaryErrorField,
        correctedTemporaryError
    }
}