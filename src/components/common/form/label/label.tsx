import React, {FC} from 'react';

interface LabelProps {
    value?: string;
    children?: React.ReactNode;
}

export const Label: FC<LabelProps> = ({value, children}) => {
    return (
        <label className="block font-medium text-sm text-gray-700 dark:text-gray-400">
            {value ? value : children}
        </label>
    )
}