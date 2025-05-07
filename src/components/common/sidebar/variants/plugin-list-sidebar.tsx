"use client"

import React, {FC} from 'react';
import {usePathname, useSearchParams} from "next/navigation";
import {PluginListFilter, PluginListFilters} from "@/constants/plugin-list.constants";
import {SidebarItem} from "@/components/common/sidebar/features/sidebar-item";
import {Sidebar} from "@/components/common/sidebar/sidebar";
import {useSession} from "next-auth/react";
import {Divider} from "@/components/common/divider/divider";

export const PluginListSidebar: FC = () => {
    const {data: session} = useSession();
    const pathname = usePathname();
    const query = useSearchParams();

    const rawFilter = query?.get('filter');
    const currentFilter = PluginListFilters[(rawFilter as string)?.toUpperCase()] || PluginListFilters.ALL;

    const getFilterHref = (filter: string) => {
        return {
            pathname: pathname,
            query: {
                ...Object.fromEntries(query?.entries() || []),
                page: 1,
                filter
            }
        }
    }

    const getSidebarItem = (filter: PluginListFilter, key?: string) => {
        return (
            <SidebarItem
                key={key}
                title={filter.label}
                icon={filter.icon}
                active={currentFilter.name === filter.name}
                href={getFilterHref(filter.name)}
                activeIconColor={filter.activeIconColor}
            />
        );
    }

    const defaultFilters = (<>
        {Object.entries(PluginListFilters)
            .filter(([_, f]) => !f.requiresAuth)
            .map(([key, filter]) => (
                getSidebarItem(filter, key)
            ))}
    </>)

    return (
        <Sidebar>
            {defaultFilters}
            {session && (
                <>
                    <Divider/>
                    {getSidebarItem(PluginListFilters.PURCHASED)}
                </>
            )}
        </Sidebar>
    );
}