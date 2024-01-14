import React, {FC, HTMLInputTypeAttribute} from 'react';
import {FormErrors} from "@/interfaces/FormErrors";
import classNames from "classnames";

interface InputProps extends Partial<HTMLInputElement> {
    value: string;
    onChange?: (value: string) => void;
    onInput?: (value: string) => void;
    errors?: FormErrors;
    item?: string;
    isTextArea?: boolean;
}

export const Input: FC<InputProps> = ({
                                          value,
                                          onChange = () => null,
                                          onInput = () => null,
                                          errors = {},
                                          item = '',
                                          isTextArea = false,
                                          type,
                                          className,
                                          disabled,
                                          ...props
                                      }) => {
    const hasError = errors && item && errors[item];
    return (
        <>
            {isTextArea ? (
                // @ts-ignore
                <textarea
                    className={classNames(
                        "rounded-md shadow-sm focus:ring focus:ring-opacity-50 checked:bg-blue-600 w-full  dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700",
                        hasError ? 'border-red-300 focus:border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200',
                        type === 'checkbox' && 'p-2.5 rounded-md',
                        className
                    )}
                    value={value}
                    onInput={e => onInput((e.target as any).value)}
                    onChange={e => onChange((e.target as any).value)}
                    {...props}
                />
            ) : (
                // @ts-ignore
                <input
                    className={classNames(
                        "!rounded-md shadow-sm dark:!shadow-gray-700 focus:ring dark:border-gray-700 focus:ring-opacity-50",
                        hasError ? 'border-red-300 focus:border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-700 focus:border-indigo-300 dark:ring-offset-gray-700 focus:ring-indigo-200',
                        type === 'checkbox' && 'p-2.5 rounded-md',
                        disabled ? 'bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600' :
                            (`bg-white dark:bg-gray-800 ${type === 'checkbox' ? 'dark:text-blue-600' : 'dark:text-gray-300'}`),
                        className
                    )}
                    value={value}
                    onInput={e => onInput((e.target as any).value)}
                    onChange={e => onChange((e.target as any).value)}
                    {...props}
                />
            )}
        </>
    )
        ;
};