import React, {FC} from "react";
import {ChildrenProp} from "@/interfaces/common";
import {Navbar} from "@/components/common/navbar/navbar";

export const AuthLayout: FC<ChildrenProp> = ({children}) => {
    return (
        <div className="flex flex-row h-full">
            <div className="w-full flex flex-col items-center m-0 p-0 h-full">
                <Navbar background/>

                {children}
            </div>
        </div>
    )
}