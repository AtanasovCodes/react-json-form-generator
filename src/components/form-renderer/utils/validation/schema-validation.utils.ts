import type { Group } from '@app-types/form-schema.type';

/**
 * Checks if the schema has any validation rules defined.
 * @param group
 * @returns
 */
const schemaHasValidation = (group: Group): boolean => {
    if (!group.children) return false;

    for (const child of group.children) {
        if (child.type === 'group') {
            if (schemaHasValidation(child)) return true;
        } else if (child.validationRules?.length) {
            return true;
        }
    }
    return false;
};

export default schemaHasValidation;
