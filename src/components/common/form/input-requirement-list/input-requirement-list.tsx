import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FieldConstraintRule} from "@/store/hooks/fields-manager/fields-manager.interface";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";

interface InputRequirementListProps {
    rules: FieldConstraintRule[];
    value: string;
}

export const InputRequirementList: FC<InputRequirementListProps> = ({rules, value}) => {
    return (
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 mt-1">
            {rules.map((rule) => (
                <li className="flex items-center gap-2" key={rule.description}>
                    <FontAwesomeIcon icon={faCircleCheck} className={rule.validator(value) ? "text-green-500 dark:text-green-400" : "text-gray-400"}/>
                    {rule.description}
                </li>
            ))}
        </ul>
    )
}