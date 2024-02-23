'use client';

import React, {FC, useState} from "react";
import {NavbarPopupItem} from "@/components/common/navbar-popup-item/navbar-popup-item";
import { faMoon, faLightbulb } from "@fortawesome/free-regular-svg-icons";

interface ThemeNavbarPopupItemProps {
    background?: boolean;
}

export const ThemeNavbarPopupItem: FC<ThemeNavbarPopupItemProps> = ({
                                                                        background = false
                                                                    }) => {
    const [darkMode, setDarkMode] = useState(false);

    const switchTheme = () => {
        const applied = document.documentElement.classList.toggle('dark');
        setDarkMode(applied);
    }

    return (
        <NavbarPopupItem
            background={background}
            icon={darkMode ? faLightbulb : faMoon}
            label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={switchTheme}
        />
    )
}