import React, {FC} from 'react';
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface PluginLabelProps {
    label: string;
    icon?: IconProp;
    background?: string;
    uppercase?: boolean;
    bold?: boolean;
}

export const PluginLabel: FC<PluginLabelProps> = ({label, icon, background, uppercase, bold}) => {
    return (
        <div className={classNames(background ? [background, 'text-white'] : 'bg-gray-100 dark:bg-gray-800',
            'flex flex-row items-center rounded-md py-1.5 px-2 w-fit font-roboto text-xs')}>
            {icon && <FontAwesomeIcon icon={icon} className="mr-2"/>}
            <span className={classNames(
                uppercase && 'uppercase',
                bold && 'font-black',
                "tracking-wider leading-none"
            )}>
                {label}
            </span>
        </div>
    );
};