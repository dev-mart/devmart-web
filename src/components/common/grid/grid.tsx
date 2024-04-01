import React, {FC} from 'react';
import {ChildrenProp} from "@/interfaces/common";
import classNames from "classnames";


export const Grid: FC<ChildrenProp> = ({children, className}) => {
    return (
        <div className={classNames('grid grid-cols-12 gap-4 w-full box-border max-w-screen-xl px-3 md:px-6 lg:px-10', className)}>
            {children}
        </div>
    )
};