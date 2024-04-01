import {AxiosError} from "axios";
import {PluginFilter, PluginListResponse} from "@/interfaces/plugin.interface";
import {useCallback, useEffect} from "react";
import {ApiErrorCodes} from "@/constants/api-errors";
import {useApiHook} from "@/hooks/use-api-hook";
import {ApiStatus} from "@/interfaces/api.interface";
import {getApiPlugins} from "@/helpers/plugins.helper";

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

        try {
            setStatus(ApiStatus.loading);

            const pluginList = await getApiPlugins(filter, query, page, perPage);
            setData(pluginList);

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