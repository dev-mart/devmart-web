import React, {FC} from 'react';

interface LabelProps extends Partial<HTMLLabelElement> {
    label: string;
}

export const Label: FC<LabelProps> = ({
                                          label,
                                      }) => {
    return (
        <label className="block font-medium text-sm text-gray-700 dark:text-gray-400 mb-1">
            {label}
        </label>
    )
}