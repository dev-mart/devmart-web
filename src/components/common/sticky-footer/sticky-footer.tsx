import React, {FC} from 'react';
import classNames from "classnames";

interface StickyFooterProps {
    fixed?: boolean;
    children: React.ReactNode;
}

export const StickyFooter: FC<StickyFooterProps> = ({fixed = false, children}) => {
    return (
        <div className={classNames(fixed ? 'fixed' : 'sticky',
            'bottom-0 left-0 w-full p-5 border-t border-t-gray-75 dark:border-t-gray-800 mt-6 flex flex-col justify-center items-center bg-white dark:bg-gray-900')}>
            {children}
        </div>
    );
}