import {FormData} from "@/store/hooks/form/store.interface";
import {Constraints, FieldsManager} from "@/store/hooks/fields-manager/fields-manager.interface";
import {createGetValidationState, createReducedValidationState, getErrorsMap} from "@/store/hooks/fields-manager/fields-manager.helper";
import {InputValidationState} from "@/components/common/form/input/input.interface";

export function createFieldsManager<FieldName extends string>(
    {
        values,
        options,
        interacted,
        hasBeenSubmitted,
    }: FormData<FieldName>,
    constraints: Constraints<FieldName>
): FieldsManager<FieldName> {
    const errors = getErrorsMap<FieldName>(values, constraints);
    const hasError = (name: FieldName) => errors[name].length > 0;
    const getError = (name: FieldName) => errors[name][0] ?? '';
    const getErrors = (name: FieldName) => errors[name];

    const getValidationState = createGetValidationState(
        values,
        errors,
        interacted,
    );
    const getReducedValidationState = createReducedValidationState(
        getValidationState,
    );
    const isValid = (name: FieldName) =>
        getValidationState(name) === InputValidationState.VALID;
    const isInvalid = (name: FieldName) =>
        getValidationState(name) === InputValidationState.INVALID;

    const getOptions = (name: FieldName) => options[name];

    const fields: FieldName[] = Object.keys(values).map(
        field => field as FieldName,
    );
    const isSubmittable = !hasBeenSubmitted && getReducedValidationState(fields)
        !== InputValidationState.INVALID;

    const getProps = (name: FieldName) => ({
        name,
        value: values[name],
        options: options[name],
        hasError: hasError(name),
        error: getError(name),
        validationState: getValidationState(name),
        isValid: isValid(name),
        isInvalid: isInvalid(name),
    });

    return {
        getProps,
        hasError,
        getError,
        getErrors,
        getValidationState,
        getReducedValidationState,
        isValid,
        isInvalid,
        getOptions,

        fields,
        constraints,
        values,
        isSubmittable,
        hasBeenSubmitted,
    };
}