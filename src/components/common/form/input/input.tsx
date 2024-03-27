import {InputProps, InputValidationState} from "@/components/common/form/input/input.interface";
import React from "react";
import {isMobile} from "@/helpers/general.helper";
import classNames from "classnames";
import {ValidationError} from "@/components/common/form/validation-error/validation-error";
import {Label} from "@/components/common/form/label/label";

export class Input extends React.PureComponent<InputProps> {

    input: React.RefObject<HTMLInputElement> = this.props.forwardedRef || React.createRef();

    componentDidMount() {
        const {focus} = this.props;
        if (this.input.current && focus && !isMobile()) {
            this.input.current.focus();
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {onChange, onValueChanged, name} = this.props;
        const {value, checked} = event.target;

        if (onChange) {
            onChange(event);
        }

        const newValue = this.props.type === 'checkbox' ? (checked ? "1" : "0") : value;
        if (onValueChanged) {
            onValueChanged({name, value: newValue});
        }
    }

    getClassNames = (): string => {
        const {disabled, validationState, type, className} = this.props;

        return classNames(
            "!rounded-md shadow-sm dark:!shadow-gray-700 focus:ring dark:border-gray-700 focus:ring-opacity-50 w-full mt-1",
            validationState === InputValidationState.INVALID && 'border-red-300 focus:border-red-300 focus:ring-red-200',
            validationState === InputValidationState.UNDETERMINED && 'border-gray-300 dark:border-gray-700 focus:border-indigo-300 dark:ring-offset-gray-700 focus:ring-indigo-200',
            validationState === InputValidationState.VALID && 'border-green-300 focus:border-green-300 focus:ring-green-200',
            disabled ? 'bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600' : 'bg-white dark:bg-gray-800 dark:text-gray-300',
            className
        );
    }

    render = () => {
        const {
            type,
            placeholder,
            name,
            disabled,
            className,
            focus,
            onChange,
            containerClassName,
            onValueChanged,
            validationState,
            errorMessage,
            children,
            forwardedRef,
            value,
            autoComplete,
            label,
            inputContainerChildren,
            inputContainerClassName,
            ...restProps
        } = this.props;

        return (
            <div className={classNames('relative', containerClassName)}>
                {label && (
                    <Label htmlFor={name} label={label}/>
                )}

                <div className={classNames('relative', inputContainerClassName)}>
                    <input
                        className={this.getClassNames()}
                        type={type}
                        placeholder={placeholder}
                        onChange={this.handleChange}
                        name={name}
                        id={name}
                        disabled={disabled}
                        ref={this.input}
                        value={value}
                        autoComplete={autoComplete}
                        {...restProps}
                    />
                    {inputContainerChildren && inputContainerChildren}
                </div>


                {children}

                {validationState === InputValidationState.INVALID && errorMessage && (
                    <ValidationError message={errorMessage}/>
                )}
            </div>
        )
    }
}