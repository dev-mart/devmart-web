import React, {FC, useEffect} from 'react';
import {InputRequirement} from "@/models/components/InputRequirement";
import {InputRequirementValues} from "@/models/components/InputRequirementValues";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface InputRequirementListProps {
    requirements: InputRequirement[];
    value: string;
}

export const InputRequirementList: FC<InputRequirementListProps> = ({requirements, value}) => {
    const values: InputRequirementValues = {
        min: {
            text: 'At least {min} characters',
            met: false,
            show: false,
            value: undefined
        },
        max: {
            text: 'Maximum {max} characters',
            met: false,
            show: false,
            value: undefined
        },
        regex: {
            text: 'Must match the following regex: {regex}',
            met: false,
            show: false,
            value: undefined
        },
        type: undefined
    };

    const updateValues = () => {
        values.min.met = !values.min.value || value.length >= values.min.value;
        values.max.met = !values.max.value || (value.length > 0 && value.length <= values.max.value);
        values.regex.met = !values.regex.value || values.regex.value.test(value);
    };

    const metAllRequirements = () => {
        if (values.min.value && !values.min.met) {
            return false;
        }
        if (values.max.value && !values.max.met) {
            return false;
        }
        return !values.regex.value || values.regex.met;
    };

    useEffect(() => {
        requirements.forEach((requirement) => {
            switch (requirement.type) {
                case 'min':
                case 'max':
                case 'regex': {
                    const requirementValue = values[requirement.type];
                    requirementValue.value = requirement.value;
                    requirementValue.text = values.min.text.replace('{min}', requirement.value);
                    requirementValue.show = true;
                    break;
                }
                case 'type': {
                    values.type = requirement.value;
                    if (requirement.value === 'username') {
                        values.regex.value = /^[a-zA-Z0-9_-]+$/;
                        values.regex.text = 'Only alphanumeric characters (a-z, 0-9, _, -)';
                        values.regex.show = true;
                    }
                }
            }
        });

        updateValues();
    });

    return (
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 mt-1">
            {Object.values(values).map((item) => (
                <>
                    {item.show && (
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon icon="circle-check" className={item.met ? "text-green-500 dark:text-green-400" : "text-gray-400"} />
                            {item.text}
                        </li>
                    )}
                </>
            ))}
        </ul>
    )
}