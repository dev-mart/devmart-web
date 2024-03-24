import React, {FC, useEffect} from 'react';
import Link from "next/link";
import classNames from "classnames";
import {NavbarPopupItem} from "@/components/common/navbar/features/navbar-popup-item";
import {ThemeNavbarPopupItem} from '@/components/common/navbar/features/variants/theme-navbar-popup-item';
import {initDropdowns} from "flowbite";
import {faGear, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {signOut, useSession} from "next-auth/react";

interface NavbarActionButtonProps {
    pathName?: string;
    background?: boolean;
}

export const NavbarActionButton: FC<NavbarActionButtonProps> = ({background = false, pathName}) => {
    let {data: session} = useSession();

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

    useEffect(() => {
        initDropdowns();
    });

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

                    <div
                        id="user-dropdown"
                        className={classNames(
                            "z-50 hidden my-4 text-base list-none divide-y rounded-lg shadow",
                            background ? "bg-gray-700 divide-gray-600 dark:bg-white dark:divide-gray-100" : "bg-white divide-gray-100"
                        )}>
                        <div className="px-4 py-3">
                            <span className={classNames(
                                "block text-sm",
                                background ? "text-gray-100 dark:text-black" : "text-gray-900"
                            )}>
                                Hi, {session.user?.name}! 👋
                            </span>
                        </div>

                        <ul aria-labelledby="user-menu-button" className="py-2">
                            <li>
                                <ThemeNavbarPopupItem background={background}/>
                            </li>
                            <li>
                                <NavbarPopupItem
                                    background={background}
                                    to="/account"
                                    icon={faGear}
                                    label="Settings"
                                    type="link"
                                />
                            </li>
                            <li>
                                <NavbarPopupItem
                                    background={background}
                                    icon={faRightFromBracket}
                                    label="Sign out"
                                    onClick={() => signOut()}
                                />
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <Link href={loginLink()} className={classes}>
                    Login
                </Link>
            )}
        </div>
    );
}