import React, {FC} from 'react';

interface StatsProps {
    children: React.ReactNode;
}

export const Stats: FC<StatsProps> = ({children}) => {
    return (
        <div className="text-xs flex flex-row items-center content-center flex-wrap mt-1">
            {children}
        </div>
    );
}