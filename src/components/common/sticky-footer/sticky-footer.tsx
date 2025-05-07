import React, {FC, PropsWithChildren} from 'react';
import classNames from "classnames";

interface StickyFooterProps {
    fixed?: boolean;
    className?: string;
}

export const StickyFooter: FC<PropsWithChildren<StickyFooterProps>> = ({fixed = false, className, children}) => {
    return (
        <div className={classNames(fixed ? 'fixed' : 'sticky', className,
            'bottom-0 left-0 w-full p-5 border-t border-t-gray-75 dark:border-t-gray-800 mt-6 flex flex-col justify-center items-center bg-white dark:bg-gray-900')}>
            {children}
        </div>
    );
}