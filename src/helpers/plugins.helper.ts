import {Plugin, PluginFilter, PluginListResponse} from "@/interfaces/plugin.interface";
import {api} from "@/services/api";
import {API_PLUGINS_URL} from "@/constants/api";
import {Values} from "@/store/hooks/form/store.interface";
import {EditPluginFieldName} from "@/components/common/form-rows/edit-plugin-form-row/edit-plugin-form-row.enums";

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
export const createNewPlugin = async (
    values: Values<EditPluginFieldName>
): Promise<Plugin> => {
    const res = await api.put(API_PLUGINS_URL, values);

    return res.data as Plugin;
}

export const getPluginLink = (plugin: Plugin) => {
    return `/plugins/${plugin.slug}.${plugin.id}`;
}

export const isPluginRecentlyUpdated = (plugin: Plugin): boolean => {
    // last 7 days
    if (!plugin.updatedAt) return false;

    const lastUpdated = new Date(plugin.updatedAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastUpdated.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= 7;
}