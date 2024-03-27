import React from 'react';
import {Navbar} from "@/components/common/navbar/navbar";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {ChildrenProp} from "@/interfaces/common";

export default async function AuthPageLayout({
                                           children
                                       }: ChildrenProp) {
    const session = await getServerSession();
    if (session) {
        redirect('/');
    }

    return (
        <div className="flex flex-row h-full">
            <div className="w-full flex flex-col items-center m-0 p-0 h-full">
                <Navbar background/>

                {children}
            </div>
        </div>
    )
}