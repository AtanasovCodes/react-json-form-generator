export const AppConfig = {
    autosaveVersion: '1.0.0',
    schemaVersion: '1.0.0',

    autosaveDebounceMs: 300,
    validationDebounceMs: 300,

    enableAutosave: true,
    enableValidation: true,

    storageKeys: {
        schema: 'schema',
        values: 'values',
    },
} as const;
