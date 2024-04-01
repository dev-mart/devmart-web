import {PluginFilter, PluginListResponse} from "@/interfaces/plugin.interface";
import {api} from "@/services/api";
import {API_PLUGINS_URL} from "@/constants/api";

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

    return res.data as PluginListResponse;
}