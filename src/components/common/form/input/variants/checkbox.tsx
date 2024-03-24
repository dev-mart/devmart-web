import React, {FC} from 'react';
import {InputProps} from "@/components/common/form/input/input.interface";
import {Input} from "@/components/common/form/input/input";
import classNames from "classnames";

interface CheckboxProps extends InputProps {
    description: React.ReactNode;
}

export const Checkbox: FC<CheckboxProps> = ({label, description, className,...props}) => {
    return (
        <Input
            type="checkbox"
            className={classNames('!h-6 !w-6 mt-0', className)}
            inputContainerClassName="flex gap-2"
            inputContainerChildren={
                <span className="text-gray-600">{description}</span>
            }
            {...props}
        />
    );
}
