"use client"

import React from 'react';
import {PluginListSidebar} from "@/components/common/sidebar/variants/plugin-list-sidebar";
import {usePluginsHook} from "@/hooks/use-plugins-hook";
import {useSearchParams} from "next/navigation";
import {PluginFilter} from "@/models/rest/plugin/PluginFilter";

export default function PluginListPage() {

    const searchParams = useSearchParams();

    // get current url server-side
    const {
        data: plugins,
        getPlugins,
        status
    } = usePluginsHook(
        PluginFilter[searchParams.get('filter')?.toUpperCase() as keyof typeof PluginFilter] || PluginFilter.ALL,
        searchParams.get('query') || '',
        parseInt(searchParams.get('page') || '1') - 1,
    );


    return (
        <>
            <PluginListSidebar/>

            <div>
                {status === 1 && <p>Loading...</p>}
                {status === 2 && <p>Ready</p>}
                {status === 3 && <p>Error</p>}
            </div>

            <div>
                {plugins && plugins.plugins.map(plugin => (
                    <div key={plugin.id}>
                        <h2>{plugin.name}</h2>
                        <p>{plugin.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
}