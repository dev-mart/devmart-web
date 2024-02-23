import {Option, Values} from "@/store/hooks/form/store.interface";
import {InputValidationState} from "@/components/common/form/input/input.interface";

export interface FieldConstraintRule {
    error: string;
    validator: (value: string) => boolean;
    description?: string;
}

export type FieldConstraint<FieldName extends string> = {
    rules: FieldConstraintRule[];
    optional?: boolean,
    options?: {
        alternatives: FieldName[] | null;
    } | null;
};

export type Constraints<FieldName extends string> = Record<
    FieldName,
    FieldConstraint<FieldName> | null
>;

export type Errors<FieldName extends string> = Record<FieldName, string[]>;

export type FieldProps<FieldName extends string> = {
    name: FieldName;
    value: string;
    hasError: boolean;
    error: string;
    validationState: InputValidationState;
    isValid: boolean;
    isInvalid: boolean;
    options: Option[] | null;
};

export type FieldsManager<FieldName extends string> = {
    getProps: (name: FieldName) => FieldProps<FieldName>;

    hasError: (name: FieldName) => boolean;
    getError: (name: FieldName) => string;
    getErrors: (name: FieldName) => string[];

    getValidationState: (name: FieldName) => InputValidationState;
    getReducedValidationState: (names: FieldName[]) => InputValidationState;
    isValid: (name: FieldName) => boolean;
    isInvalid: (name: FieldName) => boolean;

    getOptions: (name: FieldName) => Option[] | null;

    fields: FieldName[];
    constraints: Constraints<FieldName>;
    values: Values<FieldName>;
    isSubmittable: boolean;
    hasBeenSubmitted: boolean;
};