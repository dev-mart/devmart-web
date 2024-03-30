import {NameValuePair} from "@/store/hooks/form/store.interface";
import React from "react";

export enum InputValidationState {
    VALID = 'VALID',
    INVALID = 'INVALID',
    UNDETERMINED = 'UNDETERMINED',
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    validationState?: InputValidationState;
    onValueChanged?: (nameValuePair: NameValuePair<string>) => void;
    type?: 'text' | 'number' | 'tel' | 'search' | 'date' | 'time' | 'email' | 'password' | 'checkbox';
    forwardedRef?: React.RefObject<HTMLInputElement>;
    containerClassName?: string;
    name: string;
    focus?: boolean;
    errorMessage?: string;
    value?: string;
    defaultValue?: string | number | string[] | undefined;
    label?: string;
    inputContainerClassName?: string,
    inputContainerChildren?: React.ReactNode;
    marginTop?: boolean;
}