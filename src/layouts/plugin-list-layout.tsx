import React, {FC} from "react";
import {ChildrenProp} from "@/interfaces/common";
import {Navbar} from "@/components/common/navbar/navbar";
import {HeaderBackground} from "@/components/common/header-background/header-background";
import {Grid} from "@/components/common/grid/grid";

export const PluginListLayout: FC<ChildrenProp> = ({children}) => {
    return (
        <div className="flex flex-row">
            <div className="w-full flex flex-col items-center m-0 p-0">
                <Navbar background />

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