import {
    FormActionsInput,
    FormData,
    SetAllFormDataInput,
    SetHasBeenSubmittedInput,
    SetInteractedInput,
    SetOptionsInput,
    SetValueInput
} from "@/store/hooks/form/store.interface";
import {FormActions} from "@/store/hooks/form/store.enum";

export function setValue<FieldName extends string>(
    formData: FormData<FieldName>,
    nameValueInput: SetValueInput<FieldName>,
): FormData<FieldName> {
    const pairs = 'name' in nameValueInput ? [nameValueInput] : nameValueInput;

    return {
        ...formData,
        values: pairs.reduce(
            (result, {name, value}) => ({
                ...result,
                [name]: value
            }),
            formData.values,
        ),
        interacted: pairs.reduce(
            (result, {name, value}) =>
                value === '' ? {...result, [name]: false} : result,
            formData.interacted,
        ),
    };
}

export function setInteracted<FieldName extends string>(
    formData: FormData<FieldName>,
    nameInteractedInput: SetInteractedInput<FieldName>,
): FormData<FieldName> {
    // As nameValueInput can either be a single object or any array
    const pairs =
        'name' in nameInteractedInput
            ? [nameInteractedInput]
            : nameInteractedInput;

    return {
        ...formData,
        interacted: pairs.reduce(
            (result, { name, interacted }) => ({
                ...result,
                [name]: interacted,
            }),
            formData.interacted,
        ),
    };
}

export function setOptions<FieldName extends string>(
    formData: FormData<FieldName>,
    options: SetOptionsInput<FieldName>,
): FormData<FieldName> {
    return {
        ...formData,
        options: {
            ...formData.options,
            ...options,
        },
    };
}

export function setHasBeenSubmitted<FieldName extends string>(
    formData: FormData<FieldName>,
    hasBeenSubmitted: SetHasBeenSubmittedInput,
): FormData<FieldName> {
    return {
        ...formData,
        hasBeenSubmitted,
    };
}

export function setAllFormData<FieldName extends string>(
    formData: FormData<FieldName>,
): FormData<FieldName> {
    return formData;
}

export function formReducer<FieldName extends string>(
    state: FormData<FieldName>,
    {
        type,
        payload,
    }: {
        type: FormActions;
        payload: FormActionsInput<FieldName>;
    },
): FormData<FieldName> {
    switch (type) {
        case FormActions.SetAllFormData:
            return setAllFormData(payload as SetAllFormDataInput<FieldName>);
        case FormActions.SetValue:
            return setValue(state, payload as SetValueInput<FieldName>);
        case FormActions.SetInteracted:
            return setInteracted(
                state,
                payload as SetInteractedInput<FieldName>,
            );
        case FormActions.SetOptions:
            return setOptions(state, payload as SetOptionsInput<FieldName>);
        case FormActions.SetHasBeenSubmitted:
            return setHasBeenSubmitted(
                state,
                payload as SetHasBeenSubmittedInput,
            );
        default:
            return state;
    }
}