import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";

interface IconProps {
    icon: IconProp | string;
    isFontAwesome?: boolean;
}

export const Icon: FC<IconProps> = ({icon, isFontAwesome = false}) => {
    return (
        <div className="min-w-10 min-h-10 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400 flex align-center hover:bg-gray-200">
            {isFontAwesome ? (
                <FontAwesomeIcon icon={icon as IconProp} className="text-lg" />
            ) : (
                <Image src={icon as string} alt="Highlight icon" className="w-5 rounded" />
            )}
        </div>
    );
}