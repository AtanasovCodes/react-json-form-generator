import { useState, useEffect, useCallback } from 'react';

import type { Field, Group } from '@app-types/form-schema.type';

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

    const syncFormValuesWithSchema = useCallback(
        (schema: Group, formValues: Record<string, unknown>): Record<string, unknown> => {
            const validKeys = new Set<string>();

            const traverse = (node: Group | Field) => {
                validKeys.add(node.id);

                if (node.type === 'group' && Array.isArray(node.children)) {
                    node.children.forEach(traverse);
                }
            };

            traverse(schema);

            const syncedValues: Record<string, unknown> = {};
            Object.keys(formValues).forEach((key) => {
                if (validKeys.has(key)) {
                    syncedValues[key] = formValues[key];
                }
            });

            return syncedValues;
        },
        []
    );

    useEffect(() => {
        const cleaned = syncFormValuesWithSchema(schema, formValues);
        autoSaveValues.save(AppConfig.storageKeys.values, cleaned);
    }, [formValues, schema, syncFormValuesWithSchema]);

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
