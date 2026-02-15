import { useState, useEffect } from 'react';


import type { Group } from '@app-types/form-schema.type';

import { AUTO_SAVE_KEY } from '../constants';
import { exampleSchemes } from '../data/dev';
import { AutoSaveService } from '../services';

const autoSaveSchema = new AutoSaveService<Group>({
    version: '1.0.0',
    validate: (data): data is Group => !!data && typeof data === 'object',
});

const useSchemaState = () => {
    const [schema, setSchema] = useState<Group>(() => {
        const savedSchema = autoSaveSchema.load(AUTO_SAVE_KEY);
        return savedSchema ? savedSchema : exampleSchemes.blankSchema;
    });

    useEffect(() => {
        autoSaveSchema.save(AUTO_SAVE_KEY, schema);
    }, [schema]);

    useEffect(() => {
        return () => {
            autoSaveSchema.cancel();
        };
    }, []);

    return { schema, setSchema };
};

export default useSchemaState;
