import React, {FC} from "react";
import Image from "next/image";
import classNames from "classnames";

interface ResourceIconProps {
    src: string | undefined;
    size?: 'small' | 'large';
    className?: string;
}

export const ResourceIcon: FC<ResourceIconProps> = ({size = 'small', src, className}) => {
    const computedSize = size === 'large' ? 48 : 24;
    return (
        <Image
            src={src || '/svg/fallback-cover-icon.svg'}
            height={computedSize}
            width={computedSize}
            alt="Logo image"
            className={classNames(
                'object-cover border-0',
                className,
                size === 'large' ? 'w-12 h-12 rounded-lg' : 'w-6 h-6 rounded-md'
            )}
        />
    );
}