import {PluginFilter} from "@/models/rest/plugin/PluginFilter";
import {api} from "@/services/api";
import {API_PLUGINS_URL} from "@/constants/api";
import {PluginListResponse} from "@/models/rest/plugin/PluginListResponse";

export const getApiPlugins = async (
    filter: PluginFilter = PluginFilter.ALL,
    query: string = '',
    page: number = 0,
    perPage: number = 6
): Promise<PluginListResponse> => {
    const res = await api.get(API_PLUGINS_URL, {
        params: {
            filter,
            query,
            page,
            perPage
        },
    });
    const {totalElements, totalPages, currentPage, content, pageSize} = res.data;

    return {
        totalElements,
        pageSize,
        currentPage,
        totalPages,
        content
    }
}