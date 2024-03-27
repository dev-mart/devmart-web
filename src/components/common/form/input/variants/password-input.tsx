"use client";

import React, {FC, useState} from 'react';
import {Input} from "@/components/common/form/input/input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {InputProps} from "@/components/common/form/input/input.interface";
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";

export const PasswordInput: FC<InputProps> = ({
                                                  name,
                                                  autoComplete,
                                                  ...props
                                              }) => {

    const [passwordVisible, setPasswordVisible] = useState(false)

    const button = (
        <button
            className="absolute top-1/2 -translate-y-1/2 right-4 h-6 w-6 block p-0"
            title="Toggle password visibility"
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
        >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} className="h-full w-full text-gray-500"/>
        </button>
    )

    return (
        <Input name={name}
               type={passwordVisible ? 'text' : 'password'}
               autoComplete={autoComplete}
               inputContainerChildren={button}
               {...props}
        />
    );
}
