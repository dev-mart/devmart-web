import React, {FC} from "react";
import {ChildrenProp} from "@/interfaces/common";
import classNames from "classnames";

export declare type Side = 'left' | 'right';

export interface SidebarProps extends ChildrenProp {
    side?: Side;
    margin?: boolean;
}

export const Sidebar: FC<SidebarProps> = ({
                                              children,
                                              side = 'left',
                                              margin = false
                                          }) => {
    const classes = classNames({
        'lg:ml-12': margin && side === 'left',
        'lg:mr-12': margin && side === 'right',
        'lg:left-0': side === 'left',
        'lg:right-0': side === 'right',
    }, 'lg:sticky lg:top-6 h-fit col-span-12 lg:col-span-3 mb-8 dark:text-gray-300 relative');

    return (
        <aside className={classes}>
            {children}
        </aside>
    )
};