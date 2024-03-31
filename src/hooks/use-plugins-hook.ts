import {API_PLUGINS_URL} from "@/constants/api";
import {getSession} from "next-auth/react";
import axios, {AxiosError} from "axios";
import Plugin from "@/models/plugin/Plugin";
import {PluginFilter} from "@/models/rest/plugin/PluginFilter";
import {PluginListResponse} from "@/models/rest/plugin/PluginListResponse";
import {useCallback, useEffect} from "react";
import {ApiErrorCodes} from "@/constants/api-errors";
import {useApiHook} from "@/hooks/use-api-hook";
import {ApiStatus} from "@/interfaces/api.interface";

export const usePluginsHook = (
    filter: PluginFilter = PluginFilter.ALL,
    query: string = '',
    page: number = 0,
    perPage: number = 6
) => {
    const {
        status,
        error,
        data,
        setStatus,
        setError,
        setData
    } = useApiHook<PluginListResponse>();

    const getPlugins = useCallback(async (): Promise<PluginListResponse | undefined> => {
        console.log("Loading plugins...");
        console.log("Filter: ", filter);

        const session = await getSession();
        const token = session?.user.token;

        const headers = !token ? {} : {
            Authorization: `Bearer ${token}`
        }

        try {
            setStatus(ApiStatus.loading);
            const res = await axios.get(API_PLUGINS_URL, {
                params: {
                    filter,
                    query,
                    page,
                    perPage
                },
                headers
            });
            const {total, currentPage, pages, content} = res.data;

            const parsedPlugins = content.map((plugin: any) => new Plugin(plugin))

            setData({
                total,
                currentPage,
                pages,
                plugins: parsedPlugins
            });
            setStatus(ApiStatus.ready);
            return;
        } catch (e) {
            if (e instanceof AxiosError) {
                setData(undefined);
                setError(e?.response?.data);
                return;
            }
            console.error(e);
        }

        setData(undefined);
        setError({
            message: 'Something went wrong. Please try again later.',
            status: 500,
            errorCode: ApiErrorCodes.UNKNOWN_ERROR
        })
    }, [setData, setError, setStatus, filter, query, page, perPage]);

    useEffect(() => {
        getPlugins().then();
    }, [filter, query, page, perPage, getPlugins])

    return {
        data,
        status,
        getPlugins,
        error
    }
}