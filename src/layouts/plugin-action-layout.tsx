import React, {FC} from 'react';
import {Navbar} from "@/components/common/navbar/navbar";
import {Plugin} from "@/interfaces/plugin.interface";
import {HeaderBackground} from "@/components/common/header-background/header-background";
import {Grid} from "@/components/common/grid/grid";
import {PluginPreview} from "@/components/plugins/plugin-preview/plugin-preview";

interface PluginActionLayoutProps {
    title: string;
    plugin?: Plugin;
}

export const PluginActionLayout: FC<React.PropsWithChildren<PluginActionLayoutProps>> = ({title, plugin, children}) => {
    const headerContent = !plugin ? null : (
        <Grid className="py-9">
            <PluginPreview plugin={plugin}/>
        </Grid>
    );

    return (
        <div className="w-full flex flex-col items-center m-0 p-0">
            <Navbar/>

            <HeaderBackground
                title={title}
                subtitle={plugin?.name}
                content={headerContent}
            />

            <Grid>
                <div className="col-span-12 lg:col-span-10 lg:col-start-2 w-full relative">
                    {children}
                </div>
            </Grid>
        </div>
    );
};