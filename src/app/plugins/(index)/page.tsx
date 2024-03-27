"use client"

import React, {useEffect} from 'react';
import {PluginListSidebar} from "@/components/common/sidebar/variants/plugin-list-sidebar";
import {usePluginsHook} from "@/hooks/use-plugins-hook";
import {useSearchParams} from "next/navigation";

export default function PluginListPage() {

    const searchParams = useSearchParams();

    // get current url server-side
    const plugins = usePluginsHook();


    return (
        <>
            <PluginListSidebar/>
        </>
    );
}