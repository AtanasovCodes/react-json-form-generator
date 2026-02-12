import type { VisibilityCondition } from '../types';

/**
 *   Type guard to check if an object conforms to the VisibilityCondition structure.
 * @param condition
 * @returns
 */
export const isVisibilityCondition = (condition: unknown): condition is VisibilityCondition => {
    if (!condition || typeof condition !== 'object') return false;
    if (!('fieldId' in condition) || typeof condition.fieldId !== 'string') return false;
    if (!('operator' in condition) || typeof condition.operator !== 'string') return false;
    if (!('value' in condition)) return false;

    const validOperators = ['equals', 'notEquals', 'greaterThan', 'lessThan'];
    return validOperators.includes(condition.operator);
};

/**
 *  Evaluates a visibility condition against the current form values to determine if a field or group should be shown.
 *  (e.g., if the condition is { fieldId: 'userType', operator: 'equals', value: 'admin' }, this function checks if formValues['userType'] === 'admin')
 * @param condition
 * @param formValues
 * @param isVisibilityConditionFn - Optional function to validate the condition structure, useful for testing with mocks
 * @returns
 */
const evaluateVisibility = (
    condition: VisibilityCondition | undefined,
    formValues: Record<string, unknown>,
    isVisibilityConditionFn: typeof isVisibilityCondition = isVisibilityCondition
): boolean => {
    if (!condition) return true;

    if (!isVisibilityConditionFn(condition)) {
        console.warn('Invalid visibility condition:', condition);
        return true;
    }

    const { fieldId, operator, value } = condition;
    const fieldValue = formValues[fieldId];

    switch (operator) {
        case 'equals':
            return fieldValue === value;

        case 'notEquals':
            return fieldValue !== value;

        case 'greaterThan':
            return Number(fieldValue) > Number(value);

        case 'lessThan':
            return Number(fieldValue) < Number(value);

        default:
            console.warn(`Unsupported operator: ${operator}`);
            return true;
    }
};

export default evaluateVisibility;
