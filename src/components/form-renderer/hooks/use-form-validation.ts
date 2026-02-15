import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

import type { Group } from '@app-types/form-schema.type';

import { AppConfig } from '@constants/app-config';

import { isGroupValid, schemaHasValidation, validateField } from '../utils/validation';

const useFormValidation = (schema: Group, formValues: Record<string, unknown>) => {
    const [isValid, setIsValid] = useState(true);

    const hasValidation = useMemo(() => schemaHasValidation(schema), [schema]);

    const debouncedValidate = useMemo(
        () =>
            debounce((schema: Group, values: Record<string, unknown>) => {
                const result = hasValidation ? isGroupValid(schema, values, validateField) : true;
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
