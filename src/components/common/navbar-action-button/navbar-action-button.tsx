"use client"

import React, {FC, useEffect, useState} from 'react';
import Link from "next/link";
import classNames from "classnames";
import {NavbarPopupItem} from "@/components/common/navbar-popup-item/navbar-popup-item";
import {useAuth} from "@/store/auth-context";
import {usePathname} from "next/navigation";

interface NavbarActionButtonProps {
    background?: boolean;
}

export const NavbarActionButton: FC<NavbarActionButtonProps> = ({background = false}) => {
    const {applyTheme, logout, user} = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    const pathname = usePathname();

    const loginLink = () => {
        return {
            pathname: '/login',
            query: {
                redirect: pathname
            }
        }
    }

    const switchTheme = () => {
        document.documentElement.classList.toggle('dark');
    }

    const classes = classNames(
        'text-sm py-2 px-4 transition hover:bg-zinc-200 cursor-pointer relative rounded-full plain',
        background ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-900' : 'bg-white text-black'
    );

    useEffect(() => {
        applyTheme();
        setDarkMode(document.documentElement.classList.contains('dark'));
    }, [applyTheme]);

    return (
        <div className="w-56 flex first:justify-start last:justify-end">
            {user ? (
                <>
                    <div
                        id="user-menu-button"
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
                                Hi, {user.username} 👋
                            </span>
                        </div>

                        <ul aria-labelledby="user-menu-button" className="py-2">
                            <li>
                                <NavbarPopupItem
                                    background={background}
                                    icon={darkMode ? 'lightbulb' : 'moon'}
                                    label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                    onClick={switchTheme}
                                />
                            </li>
                            <li>
                                <NavbarPopupItem
                                    background={background}
                                    to="/account"
                                    icon="gear"
                                    label="Settings"
                                    type="link"
                                />
                            </li>
                            <li>
                                <NavbarPopupItem
                                    background={background}
                                    icon="right-from-bracket"
                                    label="Sign out"
                                    onClick={logout}
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