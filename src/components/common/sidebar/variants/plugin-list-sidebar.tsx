"use client"

import React, {FC} from 'react';
import {usePathname, useSearchParams} from "next/navigation";
import {PluginListFilters} from "@/constants/plugin-list.constants";
import {SidebarItem} from "@/components/common/sidebar/features/sidebar-item";
import {Sidebar} from "@/components/common/sidebar/sidebar";

export const PluginListSidebar: FC = () => {
    const pathname = usePathname();
    const query = useSearchParams();

    const rawFilter = query.get('filter');
    const currentFilter = PluginListFilters[(rawFilter as string)?.toUpperCase()] || PluginListFilters.ALL;

    const getFilterHref = (filter: string) => {
        return {
            pathname: pathname,
            query: {
                ...Object.fromEntries(query.entries()),
                page: 1,
                filter
            }
        }
    }

    return (
        <Sidebar>
            {Object.entries(PluginListFilters).map(([key, filter]) => (
                <SidebarItem
                    key={key}
                    title={filter.label}
                    icon={filter.icon}
                    active={currentFilter.name === filter.name}
                    href={getFilterHref(filter.name)}
                />
            ))}
        </Sidebar>
    );
}