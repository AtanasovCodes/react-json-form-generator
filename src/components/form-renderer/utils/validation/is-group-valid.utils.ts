import type { Group } from '@app-types/form-schema.type';

import type { ValidationRule } from '@components/form-renderer/types';

/**
 * Recursively checks if a group and all its children are valid based on the provided form values and validation function
 * @param group
 * @param formValues
 * @param validateFn
 * @returns
 */
const isGroupValid = (
    group: Group,
    formValues: Record<string, unknown>,
    validateFn: (value: unknown, rules: ValidationRule[], allValues: Record<string, unknown>) => string | null
): boolean => {
    if (!group.children) return true;

    for (const child of group.children) {
        if (child.type === 'group') {
            if (!isGroupValid(child, formValues, validateFn)) return false;
        } else {
            const value = formValues[child.id];
            if (child.validationRules?.length) {
                const error = validateFn(value, child.validationRules, formValues);
                if (error) return false;
            }
        }
    }
    return true;
};

export default isGroupValid;
