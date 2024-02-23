import {FC} from "react";
import {FormRowProps} from "@/interfaces/form.interface";
import {Input} from "@/components/common/form/input/input";
import {RegisterFieldName} from "./register-form-row.enums";
import {InputRequirementList} from "@/components/common/form/input-requirement-list/input-requirement-list";
import {FieldConstraintRule} from "@/store/hooks/fields-manager/fields-manager.interface";
import {PasswordInput} from "@/components/common/form/input/variants/password-input";
import * as Validation from "@/helpers/validation.helper";

export const RegisterFormRow: FC<FormRowProps<RegisterFieldName>> = ({
                                                                         fm,
                                                                         onChange,
                                                                         onBlur
                                                                     }) => {
    const username = fm.getProps(RegisterFieldName.username);
    const email = fm.getProps(RegisterFieldName.email);
    const password = fm.getProps(RegisterFieldName.password);
    const acceptTerms = fm.getProps(RegisterFieldName.acceptTerms);


    const usernameInput = (
        <Input
            name={username.name}
            value={username.value}
            type="text"
            autoComplete="username"
            onValueChanged={onChange}
            onBlur={onBlur}
            validationState={username.validationState}
            containerClassName="mt-4"
            errorMessage={username.error}
            placeholder="Username"
            label="Username or Email"
        />
    );

    const emailInput = (
        <Input
            name={email.name}
            value={email.value}
            type="email"
            autoComplete="email"
            onValueChanged={onChange}
            onBlur={onBlur}
            validationState={email.validationState}
            containerClassName="mt-2"
            errorMessage={email.error}
            placeholder="Email"
            label="Email"
        />
    )

    const passwordConstraints: FieldConstraintRule[] = [
        {
            description: 'Minimum 6 characters',
            validator: Validation.minLength(6),
            error: 'Password must be at least 6 characters long'
        },
        {
            description: 'Maximum 30 characters',
            validator: Validation.maxLength(30),
            error: 'Password must be at most 30 characters long'
        },
        {
            description: 'At least one number',
            validator: (value: string) => /\d/.test(value),
            error: 'Password must contain at least one number'
        }
    ]

    const passwordInput = (
        <>
            <PasswordInput
                name={password.name}
                value={password.value}
                autoComplete="new-password"
                onValueChanged={onChange}
                onBlur={onBlur}
                validationState={password.validationState}
                containerClassName="mt-2 relative"
                errorMessage={password.error}
                placeholder="Password"
                label="Password"
            />

            <InputRequirementList
                rules={passwordConstraints}
                value={password.value}
            />
        </>
    );

    return (
        <>
            {usernameInput}
            {emailInput}
            {passwordInput}
        </>
    )

}