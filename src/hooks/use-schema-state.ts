import { useState, useEffect } from 'react';

import type { Group } from '@app-types/form-schema.type';

import { AppConfig } from '../constants';
import { exampleSchemes } from '../data/dev';
import { AutoSaveService } from '../services';

const autoSaveSchema = new AutoSaveService<Group>({
    version: AppConfig.schemaVersion,
    debounceMs: AppConfig.autosaveDebounceMs,
    validate: (data): data is Group => !!data && typeof data === 'object',
});

const useSchemaState = () => {
    const [schema, setSchema] = useState<Group>(() => {
        const savedSchema = autoSaveSchema.load(AppConfig.storageKeys.schema);
        return savedSchema ? savedSchema : exampleSchemes.blankSchema;
    });

    useEffect(() => {
        autoSaveSchema.save(AppConfig.storageKeys.schema, schema);
    }, [schema]);

    useEffect(() => {
        return () => {
            autoSaveSchema.cancel();
        };
    }, []);

    return { schema, setSchema };
};

export default useSchemaState;
