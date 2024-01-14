import React, {FC} from 'react';
import css from '@/components/common/simple-card/simple-card.module.scss';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Icon} from "@/components/common/icon/icon";
import classNames from "classnames";

interface SimpleCardProps {
    children: React.ReactNode;
    title?: string;
    icon?: IconProp | string;
    fontAwesomeIcon?: boolean;
    className?: string;
}

export const SimpleCard: FC<SimpleCardProps> = ({
                                                    icon,
                                                    title,
                                                    fontAwesomeIcon = true,
                                                    children
                                                }) => {
    return (
        <div className="flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 py-4 px-5 col-span-4">
            <div className="flex flex-col gap-2">
                {icon && <Icon
                    icon={icon}
                    isFontAwesome={fontAwesomeIcon}
                />}
                {title && (
                    <div className="text-base text-gray-500 dark:text-gray-400">
                        {title}
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}