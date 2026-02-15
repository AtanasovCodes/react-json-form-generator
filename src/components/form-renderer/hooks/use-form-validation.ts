import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

import type { Group } from '@app-types/form-schema.type';

import { AppConfig } from '@constants/app-config';

import { validateField } from '../utils/validation';

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

const isGroupValid = (group: Group, formValues: Record<string, unknown>): boolean => {
    if (!group.children) return true;

    for (const child of group.children) {
        if (child.type === 'group') {
            if (!isGroupValid(child, formValues)) return false;
        } else {
            const value = formValues[child.id];
            if (child.validationRules?.length) {
                const error = validateField(value, child.validationRules, formValues);
                if (error) return false;
            }
        }
    }
    return true;
};

const useFormValidation = (schema: Group, formValues: Record<string, unknown>) => {
    const [isValid, setIsValid] = useState(true);

    const hasValidation = useMemo(() => schemaHasValidation(schema), [schema]);

    const debouncedValidate = useMemo(
        () =>
            debounce((schema: Group, values: Record<string, unknown>) => {
                const result = hasValidation ? isGroupValid(schema, values) : true;
                setIsValid(result);
            }, AppConfig.validationDebounceMs),
        [hasValidation]
    );

    useEffect(() => {
        debouncedValidate(schema, formValues);
        return () => debouncedValidate.cancel();
    }, [schema, formValues, debouncedValidate]);

    return { isValid, hasValidation };
};

export default useFormValidation;
