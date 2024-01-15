import React from 'react';
import {Navbar} from "@/components/common/navbar/navbar";

export default function AuthPageLayout({
                                           children
                                       }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-row h-full">
            <div className="w-full flex flex-col items-center m-0 p-0 h-full">
                <Navbar background/>

                {children}
            </div>
        </div>
    )
}