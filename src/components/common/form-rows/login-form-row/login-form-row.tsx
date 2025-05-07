import {FC} from "react";
import {FormRowProps} from "@/interfaces/form.interface";
import {LoginFieldName} from "@/components/common/form-rows/login-form-row/login-form.row.enums";
import {Input} from "@/components/common/form/input/input";

export const LoginFormRow: FC<FormRowProps<LoginFieldName>> = ({
                                                                   fm,
                                                                   onChange,
                                                                   onBlur
                                                               }) => {
    const username = fm.getProps(LoginFieldName.username);
    const password = fm.getProps(LoginFieldName.password);

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

    const passwordInput = (
        <Input
            name={password.name}
            value={password.value}
            type="password"
            autoComplete="current-password"
            onValueChanged={onChange}
            onBlur={onBlur}
            validationState={password.validationState}
            containerClassName="mt-2"
            errorMessage={password.error}
            placeholder="Password"
            label="Password"
        />
    );

    return (
        <>
            {usernameInput}
            {passwordInput}
        </>
    )

}