import type { ValidationRule } from '../../../types';

/**
 * Validate a field based on its validation rules and current form values.
 * @param value - The current value of the field.
 * @param validationRules - The validation rules for the field.
 * @param formValues - The current form values.
 * @returns An error message if validation fails, or null if validation passes.
 */
const validateField = (
    value: unknown,
    validationRules: ValidationRule[] = [],
    formValues: Record<string, unknown>
): string | null => {
    for (const rule of validationRules) {
        if (rule.dependsOn) {
            const dependentValue = formValues[rule.dependsOn.fieldId];
            console.log({ dependentValue, expectedValue: rule.dependsOn.value });
            if (dependentValue !== rule.dependsOn.value) {
                continue;
            }
        }

        switch (rule.type) {
            case 'required':
                // Check for undefined, null, empty string, or empty array
                // We consider 0 and false as valid values for required fields
                if (
                    value === undefined ||
                    value === null ||
                    value === '' ||
                    (Array.isArray(value) && value.length === 0)
                ) {
                    return rule.message;
                }
                break;
            case 'minLength':
                if (typeof value === 'string' && value.length < (rule.value as number)) {
                    return rule.message;
                }
                break;
            case 'maxLength':
                if (typeof value === 'string' && value.length > (rule.value as number)) {
                    return rule.message;
                }
                break;
            case 'pattern':
                if (typeof value === 'string') {
                    let regex: RegExp;

                    // Check if rule.value is already a RegExp, otherwise convert it
                    if (rule.value instanceof RegExp) {
                        regex = rule.value;
                    } else if (typeof rule.value === 'string') {
                        regex = new RegExp(rule.value);
                    } else {
                        throw new Error(`Invalid pattern value for field: ${rule.value}`);
                    }

                    if (!regex.test(value)) {
                        return rule.message;
                    }
                }
                break;
            default:
                break;
        }
    }

    return null;
};

export default validateField;
