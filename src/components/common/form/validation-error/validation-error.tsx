import React, {FC} from 'react';
import {FormErrors} from "@/interfaces/FormErrors";

interface ValidationErrorProps {
    errors: FormErrors;
    item: string;
}

export const ValidationError: FC<ValidationErrorProps> = ({errors, item}) => {
    if (item in errors) {
        return (
            <div className="text-red-500 text-md mt-1">
                {errors[item][0]}
            </div>
        );
    }
}