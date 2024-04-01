import {PluginListSidebar} from "@/components/common/sidebar/variants/plugin-list-sidebar";
import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {getApiPlugins} from "@/helpers/plugins.helper";
import {PluginFilter} from "@/models/rest/plugin/PluginFilter";
import {PluginListResponse} from "@/models/rest/plugin/PluginListResponse";
import {PluginListLayout} from "@/layouts/plugin-list-layout";

interface PluginListPageProps {
    filter: PluginFilter;
    query: string;
    page: number;
    pluginList: PluginListResponse;
}

export const getServerSideProps: GetServerSideProps<PluginListPageProps> = async (context: GetServerSidePropsContext) => {
    const url = context.req.url;
    const searchParams = new URLSearchParams(url);

    const filter = PluginFilter[searchParams.get('filter')?.toUpperCase() as keyof typeof PluginFilter] || PluginFilter.ALL;
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1') - 1;

    const pluginList = await getApiPlugins(filter, query, page);

    return {
        props: {
            filter,
            query,
            page,
            pluginList
        }
    }
}

export default function PluginListPage({
                                           pluginList,
                                           filter,
                                           query,
                                           page
                                       }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <PluginListLayout>
            <PluginListSidebar/>

            <div>
                {pluginList && pluginList.content.map(plugin => (
                    <div key={plugin.id}>
                        <h2>{plugin.name}</h2>
                        <p>{plugin.description}</p>
                    </div>
                ))}
            </div>
        </PluginListLayout>
    );
}