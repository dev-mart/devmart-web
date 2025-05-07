import {PluginListSidebar} from "@/components/common/sidebar/variants/plugin-list-sidebar";
import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {getApiPlugins} from "@/helpers/plugins.helper";
import {PluginFilter, PluginListResponse} from "@/interfaces/plugin.interface";
import {PluginListLayout} from "@/layouts/plugin-list-layout";
import {PluginPreview} from "@/components/plugins/plugin-preview/plugin-preview";
import {PluginSearchbar} from "@/components/plugins/plugin-searchbar/plugin-searchbar";
import {SeoMeta} from "@/components/common/seo-meta/SeoMeta";
import {SeoDescription, SeoTitle} from "@/constants/seo.constants";

interface PluginListPageProps {
    filter: PluginFilter;
    query: string;
    page: number;
    pluginList: PluginListResponse | null;
}

export const getServerSideProps: GetServerSideProps<PluginListPageProps> = async (context: GetServerSidePropsContext) => {
    const filter = PluginFilter[(context.query.filter as string)?.toUpperCase() as keyof typeof PluginFilter] || PluginFilter.ALL;
    const query = (context.query.query as string) || '';
    const page = parseInt((context.query.page as string) || '1') - 1;

    let pluginList;
    try {
        pluginList = await getApiPlugins(filter, query, page);
    } catch (e) {
        pluginList = null;
    }

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
    const computedPage = pluginList?.currentPage || page;
    const computedTotalElements = pluginList?.totalElements || 0;
    return (
        <>
            <SeoMeta
                title={SeoTitle.Plugins}
                description={SeoDescription.Plugins}
            />

            <PluginListLayout>
                <PluginListSidebar/>

                <div className="col-span-12 lg:col-span-9 w-full">
                    <PluginSearchbar initialValue={query}/>

                    <div className="w-full col-gap-4 mt-2 text-xl font-bold">
                        {computedTotalElements} Plugins Found
                        {computedPage > 1 && ` - Page ${computedPage}`}
                    </div>

                    <div className="flex gap-y-5 mt-2 flex-col">
                        {pluginList && pluginList.content.map(plugin => (
                            <PluginPreview plugin={plugin} key={plugin.id}/>
                        ))}
                    </div>

                    { /* TODO: Implement Pagination */}
                </div>
            </PluginListLayout>
        </>
    );
}