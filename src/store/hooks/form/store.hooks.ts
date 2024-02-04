import {
    FormAction,
    FormHook,
    FormHooksMiddlewares,
    FormOnBlur,
    FormOnChange,
    FormOnSubmit,
    NameInteractedPair,
    NameValuePair
} from "@/store/hooks/form/store.interface";
import {useMemo, useReducer} from "react";
import {Constraints} from "@/store/hooks/fields-manager/fields-manager.interface";
import {formReducer, setInteracted, setValue} from "@/store/hooks/form/store.reducer";
import {extractNameValue, initFormData} from "@/store/hooks/form/store.helpers";
import {FormActions} from "@/store/hooks/form/store.enum";
import {createFieldsManager} from "@/store/hooks/fields-manager/fields-manager";

export function useForm<FieldName extends string>(
    fields: FieldName[],
    constraints: Constraints<FieldName>,
    {
        afterChangeMiddleware,
        afterBlurMiddleware,
        afterSubmitMiddleware,
    }: FormHooksMiddlewares<FieldName>,
): FormHook<FieldName> {
    const [state, dispatch] = useReducer(
        formReducer,
        initFormData<FieldName>(fields)
    );

    const actions: FormAction<FieldName> = useMemo(
        () => ({
            setValue: nameValuePair =>
                dispatch({
                    type: FormActions.SetValue,
                    payload: nameValuePair,
                }),
            setInteracted: nameInteractedPair =>
                dispatch({
                    type: FormActions.SetInteracted,
                    payload: nameInteractedPair,
                }),
            setOptions: options =>
                dispatch({
                    type: FormActions.SetOptions,
                    payload: options,
                }),
            setHasBeenSubmitted: hasBeenSubmitted =>
                dispatch({
                    type: FormActions.SetHasBeenSubmitted,
                    payload: hasBeenSubmitted,
                }),
        }),
        [dispatch],
    );

    const fm = createFieldsManager(state, constraints);

    const handleChange: FormOnChange = event => {
        const { name, value } = extractNameValue(event);
        const nameValuePair = {
            name,
            value,
        } as NameValuePair<FieldName>;
        actions.setValue(nameValuePair);

        if (afterChangeMiddleware) {
            const optimisticUpdatedFieldsManager = createFieldsManager(
                setValue(state, nameValuePair),
                constraints,
            );
            afterChangeMiddleware(
                name as FieldName,
                actions,
                optimisticUpdatedFieldsManager,
            );
        }
    };

    const handleBlur: FormOnBlur = event => {
        const { name } = extractNameValue(event);
        const nameInteractedPair = {
            name,
            interacted: true,
        } as NameInteractedPair<FieldName>;
        actions.setInteracted(nameInteractedPair);

        if (afterBlurMiddleware) {
            const optimisticUpdatedFieldsManager = createFieldsManager(
                setInteracted(state, nameInteractedPair),
                constraints,
            );
            afterBlurMiddleware(
                name as FieldName,
                actions,
                optimisticUpdatedFieldsManager,
            );
        }
    };

    const handleSubmit: FormOnSubmit = () => {
        // Set all fields to interacted, enabling constraints
        const interactAllField = fm.fields.map(name => ({
            name,
            interacted: true,
        }));

        const optimisticUpdatedFieldsManager = setInteracted(
            state,
            interactAllField,
        );
        dispatch({
            type: FormActions.SetAllFormData,
            payload: optimisticUpdatedFieldsManager,
        });

        // Validate that all constraints are met with new interacted state
        const nextFm = createFieldsManager(
            optimisticUpdatedFieldsManager,
            constraints,
        );
        if (nextFm.isSubmittable) {
            // Proceed with submitting
            actions.setHasBeenSubmitted(true);
            afterSubmitMiddleware(nextFm.values, actions);
        }
    };

    const eventHandlers = { handleChange, handleBlur, handleSubmit };

    return {
        fm,
        actions,
        eventHandlers,
    };
}