import React, {FC} from 'react';
import Link from "next/link";
import classNames from "classnames";

interface NavbarItemProps {
    label: string;
    href: string;
    background?: boolean
}

export const NavbarItem: FC<NavbarItemProps> = ({
                                                    label,
                                                    href,
                                                    background = false
                                                }) => {
    return (
        <Link
            href={href}
            className={classNames(
                "font-poppins font-semibold text-base no-underline mx-3 p-4 hover:underline plain",
                background ? 'text-gray-900 dark:text-white' : 'text-white'
            )}
        >
            {label}
        </Link>
    );
}
