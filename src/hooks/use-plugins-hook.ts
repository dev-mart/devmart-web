import {API_PLUGINS_URL} from "@/constants/api";
import {useSession} from "next-auth/react";
import axios, {AxiosError} from "axios";
import Plugin from "@/models/plugin/Plugin";
import {PluginFilter} from "@/models/rest/plugin/PluginFilter";
import {PluginListResponse} from "@/models/rest/plugin/PluginListResponse";
import {useState} from "react";
import {ApiError} from "@/models/rest/ApiError";
import {ApiErrorCodes} from "@/constants/api-errors";

export const usePluginsHook = () => {
    const [error, setError] = useState<ApiError>();

    const session = useSession();
    const token = session.data?.user.token;

    console.log(token)

    const getPlugins = async (filter: PluginFilter = PluginFilter.ALL, query: string = '', page: number = 1, perPage: number = 6): Promise<PluginListResponse | undefined> => {
        try {
            const res = await axios.get(API_PLUGINS_URL, {
                params: {
                    filter,
                    query,
                    page,
                    perPage
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {total, currentPage, pages, plugins} = res.data;

            const parsedPlugins = plugins.map((plugin: any) => new Plugin(plugin))

            return {
                total,
                currentPage,
                pages,
                plugins: parsedPlugins
            };
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e?.response?.data);
                return;
            }
            console.error(e);
        }

        setError({
            message: 'Something went wrong. Please try again later.',
            status: 500,
            errorCode: ApiErrorCodes.UNKNOWN_ERROR
        })
    }

    return {
        getPlugins,
        error
    }
}