import type { Group, Field } from '@app-types/form-schema.type';

import evaluateVisibility from './evaluate-visibility.utils';

const isGroup = (item: Group | Field): item is Group => {
    return 'children' in item;
};

/**
 * Recursively generate a JSON object from the form schema and form values.
 * @param schema - The form schema.
 * @param formValues - The current form values.
 * @returns A JSON object containing the filled-in values.
 */
const generateJSON = (schema: Group, formValues: Record<string, unknown>): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    schema.children.forEach((child) => {
        if (isGroup(child)) {
            if (evaluateVisibility(child.visibilityCondition, formValues)) {
                result[child.id] = generateJSON(child, formValues);
            }
        } else {
            if (evaluateVisibility(child.visibilityCondition, formValues)) {
                result[child.id] = formValues[child.id] ?? null;
            }
        }
    });

    return result;
};

export default generateJSON;
