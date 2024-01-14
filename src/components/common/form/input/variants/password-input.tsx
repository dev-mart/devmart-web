import React, {FC, useState} from 'react';
import {FormErrors} from "@/interfaces/FormErrors";
import {Input} from "@/components/common/form/input/input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface PasswordInputProps {
    value: string;
    onChange?: (value: string) => void;
    errors?: FormErrors;
    item?: string;
}

export const PasswordInput: FC<PasswordInputProps> = ({
                                                          value,
                                                          onChange = () => null,
                                                          errors = {},
                                                          item = ''
                                                      }) => {

    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
        <div className="relative">
            <Input
                value={value}
                onInput={onChange}
                errors={errors}
                item={item}
                type={passwordVisible ? 'text' : 'password'}
                autocomplete="new-password"
                className="block mt-1 w-full"
                name="password"
                placeholder="Password"
                required
            />

            <button
                className="absolute top-1/2 -translate-y-1/2 right-4 h-6 w-6 block p-0"
                title="Toggle password visibility"
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
            >
                <FontAwesomeIcon icon={passwordVisible ? 'eye-slash' : 'eye'} className="h-full w-full text-gray-500"/>
            </button>

        </div>
    );
}
