import React, {FC} from 'react';

interface ValidationErrorProps {
    message: string;
}

export const ValidationError: FC<ValidationErrorProps> = ({message}) => {
    return (
        <div className="text-red-500 text-md mt-1">
            {message}
        </div>
    );
}