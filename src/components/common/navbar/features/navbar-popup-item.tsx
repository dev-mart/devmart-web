import React, {FC} from 'react';
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

interface NavbarPopupItemProps {
    icon: IconProp;
    label: string;
    background: boolean;
    onClick?: () => void;
    type?: "button" | "link";
    to?: string;
}

export const NavbarPopupItem: FC<NavbarPopupItemProps> = ({
                                                              icon,
                                                              label,
                                                              background,
                                                              onClick,
                                                              to,
                                                              type = "button"
                                                          }) => {

    const classes = classNames(
        "px-4 py-2 w-full rounded-none text-sm flex flex-row items-center gap-2 plain",
        background ? "text-gray-200 dark:text-gray-700 hover:bg-gray-800 dark:hover:bg-gray-100" :
            "text-gray-800 hover:text-gray-900 hover:bg-gray-100"
    );

    return (
        <>
            {type === "button" ? (
                <button className={classes} type="button" onClick={onClick}>
                    <FontAwesomeIcon icon={icon} className="text-xs min-w-3"/>
                    <span>{label}</span>
                </button>
            ) : (
                <Link href={to ?? '/'} className={classes}>
                    <FontAwesomeIcon icon={icon} className="text-xs min-w-3"/>
                    <span>{label}</span>
                </Link>
            )}
        </>
    );
}