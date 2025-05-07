import {FormHooksSubmitMiddleware} from "@/store/hooks/form/store.interface";
import {EditPluginFieldName} from "@/components/common/form-rows/edit-plugin-form-row/edit-plugin-form-row.enums";
import {useAddPluginHook} from "@/hooks/use-add-plugin-hook";
import {ApiError} from "@/interfaces/api.interface";

interface EditPluginFormSubmitMiddlewareHook {
    error?: ApiError;
    afterSubmitMiddleware: FormHooksSubmitMiddleware<EditPluginFieldName>
}

export const useEditPluginFormSubmitMiddleware = (): EditPluginFormSubmitMiddlewareHook => {
    const {createPlugin, error} = useAddPluginHook();

    return {
        error,
        afterSubmitMiddleware: (values, actions) => {
            createPlugin(values).then(() => actions.setHasBeenSubmitted(false));
        }
    }
}