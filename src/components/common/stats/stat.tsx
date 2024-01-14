import React, {FC} from 'react';
import classNames from "classnames";

interface StatsProps {
    dot?: boolean;
    small?: boolean;
    value: string;
}

export const Stat: FC<StatsProps> = ({dot = false, small = false, value}) => {
    return (
        <>
            {dot &&
                <div className="rounded-full w-2 h-2 mr-2 flex-shrink-0 bg-gray-300 dark:bg-gray-700"/>
            }
            <div className={classNames({
                'text-sm mr-2': small,
                'text-base mr-4': !small},
                'font-semibold text-gray-500 dark:text-gray-400'
            )}>
                {value}
            </div>
        </>
    );
}