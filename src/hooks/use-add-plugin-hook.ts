import {useApiHook} from "@/hooks/use-api-hook";
import {Plugin} from "@/interfaces/plugin.interface";
import {Values} from "@/store/hooks/form/store.interface";
import {EditPluginFieldName} from "@/components/common/form-rows/edit-plugin-form-row/edit-plugin-form-row.enums";
import {useCallback} from "react";
import {ApiStatus} from "@/interfaces/api.interface";
import {createNewPlugin} from "@/helpers/plugins.helper";
import {AxiosError} from "axios";
import {ApiErrorCodes} from "@/constants/api-errors";

export const useAddPluginHook = () => {
    const {
        status,
        error,
        data,
        setStatus,
        setError,
        setData
    } = useApiHook<Plugin>();

    const createPlugin = useCallback(async (values: Values<EditPluginFieldName>) => {
        try {
            setStatus(ApiStatus.loading);

            const plugin = await createNewPlugin(values);

            setData(plugin);
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
    }, [setData, setError, setStatus]);

    return {
        status,
        error,
        data,
        createPlugin
    }
}