"use client"

import React, {FC} from 'react';
import Link from "next/link";
import classNames from "classnames";
import {NavbarPopup} from "@/components/common/navbar/features/navbar-popup";
import {Session} from "next-auth";

interface NavbarActionButtonProps {
    pathName?: string;
    background?: boolean;
    session: Session | null;
}

export const NavbarActionButton: FC<NavbarActionButtonProps> = ({background = false, pathName, session}) => {

    const loginLink = () => {
        return {
            pathname: '/login',
            query: {
                redirect: pathName
            }
        }
    }

    const classes = classNames(
        'text-sm py-2 px-4 transition cursor-pointer relative rounded-full plain select-none',
        background ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900' : 'bg-white text-gray-900'
    );

    return (
        <div className="w-56 flex first:justify-start last:justify-end">
            {session ? (
                <>
                    <div
                        id="user-menu-button"
                        role="button"
                        aria-expanded="false"
                        className={classes}
                        data-dropdown-placement="bottom-end"
                        data-dropdown-toggle="user-dropdown"
                    >
                        Account
                    </div>

                    <NavbarPopup background={background} session={session}/>
                </>
            ) : (
                <Link href={loginLink()} className={classes}>
                    Login
                </Link>
            )}
        </div>
    );
}