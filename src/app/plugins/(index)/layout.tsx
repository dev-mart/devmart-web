import React from 'react';
import {Navbar} from "@/components/common/navbar/navbar";
import {HeaderBackground} from "@/components/common/header-background/header-background";
import {Grid} from "@/components/common/grid/grid";

interface LayoutProps {
    children: React.ReactNode;
}

export default async function PastesListLayout({
                                                   children
                                               }: LayoutProps) {
    return (
        <div className="flex flex-row">
            <div className="w-full flex flex-col items-center m-0 p-0">
                <Navbar/>

                <HeaderBackground
                    title="Plugins"
                    subtitle="Our selection of high quality plugins"
                />

                <Grid className="mb-6 mt-4">
                    {children}
                </Grid>
            </div>
        </div>
    );
}