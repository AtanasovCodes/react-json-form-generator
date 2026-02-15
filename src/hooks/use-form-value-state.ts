import { useState, useEffect } from 'react';

import { AUTO_SAVE_KEY } from '../constants';
import { AutoSaveService } from '../services';

const autoSaveValues = new AutoSaveService<Record<string, unknown>>({
    version: '1.0.0',
    validate: (data): data is Record<string, unknown> => !!data && typeof data === 'object',
});
const useFormValuesState = () => {
    const [formValues, setFormValues] = useState<Record<string, unknown>>(() => {
        const savedValues = autoSaveValues.load(`values:${AUTO_SAVE_KEY}`);
        return savedValues ? savedValues : {};
    });

    useEffect(() => {
        autoSaveValues.save(`values:${AUTO_SAVE_KEY}`, formValues);
    }, [formValues]);

    useEffect(() => {
        return () => {
            autoSaveValues.cancel();
        };
    }, []);

    return { formValues, setFormValues };
};

export default useFormValuesState;
