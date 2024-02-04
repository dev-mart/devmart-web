import {FormData, InputEvent, Interacted, NameValuePair, Options, Values} from "@/store/hooks/form/store.interface";

export function initFormData<FieldName extends string>(
    fields: FieldName[],
): FormData<FieldName> {
    const initialValues = fields.reduce(
        (res, field) => ({...res, [field]: ''}),
        {} as Values<FieldName>,
    );

    return {
        values: {...initialValues},
        options: {
            ...Object.keys(initialValues).reduce(
                (res, field) => ({...res, [field]: null}),
                {} as Options<FieldName>,
            ),
        },
        interacted: Object.keys(initialValues).reduce(
            (res, field) => ({...res, [field]: false}),
            {} as Interacted<FieldName>,
        ),
        hasBeenSubmitted: false,
    };
}

export function extractNameValue<FieldName extends string>(
    event: InputEvent | NameValuePair<FieldName>,
): NameValuePair<FieldName> {
    if ('currentTarget' in event) {
        const {name, value} = (event as InputEvent).currentTarget;
        return {
            value,
            name: name as FieldName,
        };
    }

    if ('name' in event && 'value' in event) {
        return event;
    }
    return {
        name: '' as FieldName,
        value: '',
    };
}