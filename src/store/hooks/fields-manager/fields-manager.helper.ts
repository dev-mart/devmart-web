import {Constraints, Errors, FieldConstraintRule,} from "@/store/hooks/fields-manager/fields-manager.interface";
import {Interacted, Values} from "@/store/hooks/form/store.interface";
import {InputValidationState} from "@/components/common/form/input/input.interface";

export function getErrors(
    value: string,
    constraints: FieldConstraintRule[],
    optionalField: boolean,
): string[] {
    if (!value && optionalField) {
        return [];
    }
    return constraints.reduce((errors, rule) => {
        if (!rule.validator(value)) {
            errors.push(rule.error);
        }
        return errors;
    }, [] as string[]);
}


export function validateConstraint<FieldName extends string>(
    values: Values<FieldName>,
    constraints: Constraints<FieldName>,
): Record<FieldName, string[]> {
    return Object.keys(values).reduce((errors, fieldName) => {
        const fieldConstraints = constraints[fieldName as FieldName];

        return {
            ...errors,
            [fieldName]: fieldConstraints
                ? getErrors(
                    values[fieldName as FieldName],
                    fieldConstraints?.rules ?? [],
                    fieldConstraints?.optional || false
                )
                : [],
        };
    }, {} as Record<FieldName, string[]>);
}

export function applyAlternatives<FieldName extends string>(
    errors: Errors<FieldName>,
    constraints: Constraints<FieldName>,
): Errors<FieldName> {
    let hasChanged = false;
    // traverse all fields
    const applied = Object.keys(errors).reduce((errorResult, fieldName) => {
        const name = fieldName as FieldName;

        let fieldErrors = errors[name];
        // skip if field already has no errors
        if (fieldErrors.length === 0) {
            return errorResult;
        }

        const fieldConstraint = constraints[name];

        if (
            fieldConstraint?.options?.alternatives?.some(
                alternative => errors[alternative].length === 0,
            )
        ) {
            // remove constraint error from set of errors for this field
            fieldErrors = [];
            hasChanged = true;
        }

        return {
            ...errorResult,
            [name]: fieldErrors,
        };
    }, errors);

    // recursive base case
    if (!hasChanged) {
        return applied;
    }

    // when a change has been made to the error result
    // this could mean that other alternatives are now
    // also possible, therefore apply alternatives again.
    return applyAlternatives(applied, constraints);
}

export function getErrorsMap<FieldName extends string>(
    values: Values<FieldName>,
    constraints: Constraints<FieldName>,
): Errors<FieldName> {
    const vanillaErrors = validateConstraint(values, constraints);

    // Apply validator options
    // Check if there are alternatives for fields
    // Currently 'alternatives' is the only validator option
    return applyAlternatives(vanillaErrors, constraints);
}

export function createGetValidationState<FieldName extends string>(
    values: Values<FieldName>,
    errors: Errors<FieldName>,
    interacted: Interacted<FieldName>,
) {
    return (name: FieldName): InputValidationState => {
        const hasValue = values[name].length;
        const hasError = errors[name].length;
        const hasInteracted = interacted[name];
        if (hasError && hasInteracted) {
            return InputValidationState.INVALID;
        }
        if (hasValue && !hasError && hasInteracted) {
            return InputValidationState.VALID;
        }
        return InputValidationState.UNDETERMINED;
    };
}

export function reduceValidationStates(
    validationStates: InputValidationState[],
): InputValidationState {
    if (!validationStates.length) {
        return InputValidationState.UNDETERMINED;
    }
    return validationStates.reduce(
        (
            validationResult: InputValidationState,
            validationState: InputValidationState,
        ): InputValidationState => {
            if (validationResult === InputValidationState.INVALID) {
                return InputValidationState.INVALID;
            }
            if (validationState === InputValidationState.VALID) {
                return validationResult;
            }
            return validationState;
        },
        InputValidationState.VALID,
    );
}

export function createReducedValidationState<FieldName extends string>(
    getValidationState: (name: FieldName) => InputValidationState,
) {
    return (names: FieldName[]): InputValidationState =>
        reduceValidationStates(names.map(getValidationState));
}