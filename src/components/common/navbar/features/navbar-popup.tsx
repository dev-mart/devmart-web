"use client"

import React, {FC, useEffect} from 'react';
import classNames from "classnames";
import {ThemeNavbarPopupItem} from "@/components/common/navbar/features/variants/theme-navbar-popup-item";
import {NavbarPopupItem} from "@/components/common/navbar/features/navbar-popup-item";
import {faGear, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {signOut} from "next-auth/react";
import {Session} from "next-auth";
import {initDropdowns} from "flowbite";

interface NavbarPopupProps {
    background: boolean;
    session: Session;
}

export const NavbarPopup: FC<NavbarPopupProps> = ({background, session}) => {
    useEffect(() => {
        initDropdowns();
    });

    return (
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
                        onClick={signOut}
                    />
                </li>
            </ul>
        </div>
    );
}