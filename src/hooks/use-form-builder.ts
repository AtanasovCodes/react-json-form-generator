import { useState, useEffect, useCallback } from 'react';

import type { Group } from '@app-types/form-schema.type';

import { exampleSchemes } from '@data/dev';

import { AppConfig } from '@constants/app-config';

import { AutoSaveService } from '../services/index';

const autoSaveValues = new AutoSaveService<Record<string, unknown>>({
    version: AppConfig.schemaVersion,
    debounceMs: AppConfig.autosaveDebounceMs,
    validate: (data): data is Record<string, unknown> => !!data && typeof data === 'object',
});

const autoSaveSchema = new AutoSaveService<Group>({
    version: AppConfig.schemaVersion,
    debounceMs: AppConfig.autosaveDebounceMs,
    validate: (data): data is Group => !!data && typeof data === 'object',
});

const useFormBuilder = () => {
    const [schema, setSchema] = useState<Group>(() => {
        const savedSchema = autoSaveSchema.load(AppConfig.storageKeys.schema);
        return savedSchema ? savedSchema : exampleSchemes.blankSchema;
    });

    const [formValues, setFormValues] = useState<Record<string, unknown>>(() => {
        const savedValues = autoSaveValues.load(AppConfig.storageKeys.values);
        return savedValues ? savedValues : {};
    });

    const resetState = useCallback(() => {
        setSchema(exampleSchemes.blankSchema);
        setFormValues({});
    }, []);

    useEffect(() => {
        autoSaveValues.save(AppConfig.storageKeys.values, formValues);
    }, [formValues]);

    useEffect(() => {
        autoSaveSchema.save(AppConfig.storageKeys.schema, schema);
    }, [schema]);

    useEffect(() => {
        return () => {
            autoSaveValues.cancel();
            autoSaveSchema.cancel();
        };
    }, []);

    return { schema, setSchema, formValues, setFormValues, resetState };
};

export default useFormBuilder;
