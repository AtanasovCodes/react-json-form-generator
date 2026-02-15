import { useState, useEffect } from 'react';

import { AppConfig } from '../constants';
import { AutoSaveService } from '../services';

const autoSaveValues = new AutoSaveService<Record<string, unknown>>({
    version: AppConfig.schemaVersion,
    debounceMs: AppConfig.autosaveDebounceMs,
    validate: (data): data is Record<string, unknown> => !!data && typeof data === 'object',
});
const useFormValuesState = () => {
    const [formValues, setFormValues] = useState<Record<string, unknown>>(() => {
        const savedValues = autoSaveValues.load(AppConfig.storageKeys.values);
        return savedValues ? savedValues : {};
    });

    useEffect(() => {
        autoSaveValues.save(AppConfig.storageKeys.values, formValues);
    }, [formValues]);

    useEffect(() => {
        return () => {
            autoSaveValues.cancel();
        };
    }, []);

    return { formValues, setFormValues };
};

export default useFormValuesState;
