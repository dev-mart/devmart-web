import {FC} from 'react';
import Link from "next/link";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import type {UrlObject} from "url";

interface SidebarItemProps {
    icon: IconProp;
    title: string;
    href: string | UrlObject;
    active?: boolean;
    highlight?: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = ({
                                                      icon,
                                                      title,
                                                      href,
                                                      active = false,
                                                      highlight = false
                                                  }) => {
    const rootClasses = classNames(
        {
            'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600': active,
            'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700': highlight,
            'hover:bg-gray-100 dark:hover:bg-gray-800': !active && !highlight,
            'hover:bg-gray-200 dark:hover:bg-gray-700': !active && highlight
        },
        'flex flex-row items-center py-3 px-4 my-2 rounded-lg plain lg:mr-3'
    );

    const titleClasses = classNames(
        active ? 'text-gray-900 dark:text-gray-200 font-semibold' : 'font-normal text-gray-700 dark:text-gray-300',
        'text-base'
    );

    return (
        <Link
            href={href}
            className={rootClasses}
        >
            <div className="flex justify-center items-center h-5 w-5 mr-4">
                <FontAwesomeIcon
                    icon={icon}
                    className="h-full w-full fill-gray-700"
                />
            </div>
            <div className={titleClasses}>
                {title}
            </div>
        </Link>
    );
}