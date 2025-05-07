import React, {FC, ReactNode} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import classNames from "classnames";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

declare type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";

interface IconProps {
    icon: IconProp | string | StaticImport | ReactNode;
    isFontAwesome?: boolean;
    background?: boolean;
    size?: IconSize;
}

export const Icon: FC<IconProps> = ({
                                        icon,
                                        isFontAwesome = false,
                                        background = true,
                                        size = "lg",
                                    }) => {
    return (
        <div className={classNames(
            background && "min-w-10 min-h-10 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 ",
            "flex items-center justify-center"
        )}>
            {React.isValidElement(icon) ? (
                icon
            ) : (
                <>
                    {isFontAwesome ? (
                        <FontAwesomeIcon icon={icon as IconProp} className={`text-${size}`}/>
                    ) : (
                        <Image src={icon as string | StaticImport} alt="Highlight icon" className="w-5 rounded"/>
                    )}
                </>
            )}
        </div>
    );
}