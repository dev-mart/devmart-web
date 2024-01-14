import React, {FC} from 'react';

interface SelectProps {
    children: React.ReactNode;
}

export const Select: FC<SelectProps> = ({children}) => {
    return (
        <select
            className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
        >
            {children}
        </select>
    );
}