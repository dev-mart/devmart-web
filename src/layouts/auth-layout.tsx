import React, {FC} from "react";
import {ChildrenProp} from "@/interfaces/common";
import {Navbar} from "@/components/common/navbar/navbar";

export const AuthLayout: FC<ChildrenProp> = ({children}) => {
    return (
        <div className="flex flex-row min-h-screen">
            <div className="flex flex-col items-center m-0 p-0 w-full min-h-screen h-full flex-1">
                <Navbar background/>

                {children}
            </div>
        </div>
    )
}