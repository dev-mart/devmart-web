import React from "react";
import {FieldsManager} from "@/store/hooks/fields-manager/fields-manager.interface";

type FieldValue = string;

export type Values<Fields extends string> = Record<Fields, FieldValue>

export type Option = {
    value: FieldValue,
    label: string | null
};

export type Options<FieldName extends string> = Record<
    FieldName,
    Option[] | null
>;

export type Interacted<FieldName extends string> = Record<FieldName, boolean>;

export type FormData<FieldName extends string> = {
    values: Values<FieldName>;
    options: Options<FieldName>;
    interacted: Interacted<FieldName>;
    hasBeenSubmitted: boolean;
};

export type NameValuePair<FieldName extends string> = {
    name: FieldName;
    value: FieldValue;
};

export type NameInteractedPair<FieldName extends string> = {
    name: FieldName;
    interacted: boolean;
};

export type InputEvent = React.SyntheticEvent<HTMLInputElement>;

export type SetAllFormDataInput<FieldName extends string> = FormData<FieldName>;
export type SetValueInput<FieldName extends string> =
    | NameValuePair<FieldName>
    | NameValuePair<FieldName>[];
export type SetInteractedInput<FieldName extends string> =
    | NameInteractedPair<FieldName>
    | NameInteractedPair<FieldName>[];
export type SetOptionsInput<FieldName extends string> = Partial<
    Options<FieldName>
>;
export type SetHasBeenSubmittedInput = boolean;
export type FormActionsInput<FieldName extends string> =
    | SetAllFormDataInput<FieldName>
    | SetValueInput<FieldName>
    | SetInteractedInput<FieldName>
    | SetOptionsInput<FieldName>
    | SetHasBeenSubmittedInput;

type FormSetValueHooks<FieldName extends string> = (
    nameValuePair: NameValuePair<FieldName> | NameValuePair<FieldName>[],
) => void;

type FormSetInteractedHooks<FieldName extends string> = (
    nameInteractedPair:
        | NameInteractedPair<FieldName>
        | NameInteractedPair<FieldName>[],
) => void;

type FormSetOptionsHooks<FieldName extends string> = (
    options: Partial<Options<FieldName>>,
) => void;

type FormSetHasBeenSubmittedHooks = (hasBeenSubmitted: boolean) => void;

export type FormAction<FieldName extends string> = {
    setValue: FormSetValueHooks<FieldName>;
    setInteracted: FormSetInteractedHooks<FieldName>;
    setOptions: FormSetOptionsHooks<FieldName>;
    setHasBeenSubmitted: FormSetHasBeenSubmittedHooks;
};

export type FormOnChange = (event: InputEvent | NameValuePair<string>) => void;

export type FormOnBlur = (event: InputEvent | NameValuePair<string>) => void;

export type FormOnSubmit = () => void;

type FormEvents = {
    handleChange: FormOnChange;
    handleBlur: FormOnBlur;
    handleSubmit: FormOnSubmit;
};

export type FormHooksAfterChangeMiddleware<FieldName extends string> = (
    name: FieldName,
    actions: FormAction<FieldName>,
    optimisticUpdatedFieldsManager: FieldsManager<FieldName>,
) => void;

export type FormHooksSubmitMiddleware<FieldName extends string> = (
    values: Values<FieldName>,
    actions: FormAction<FieldName>,
) => void;

export type FormHooksMiddlewares<FieldName extends string> = {
    afterChangeMiddleware?: FormHooksAfterChangeMiddleware<FieldName>;
    afterBlurMiddleware?: FormHooksAfterChangeMiddleware<FieldName>;
    afterSubmitMiddleware?: FormHooksSubmitMiddleware<FieldName>;
};

export type FormHook<FieldName extends string> = {
    fm: FieldsManager<FieldName>;
    actions: FormAction<FieldName>;
    eventHandlers: FormEvents;
};