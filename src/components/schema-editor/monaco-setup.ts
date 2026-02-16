import { loader } from '@monaco-editor/react';

import jsonSchema from '../../data/json-schema/form-schema.json';

export const setupMonaco = () => {
    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === 'json') {
                return new Worker(new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url), {
                    type: 'module',
                });
            }
            return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url), {
                type: 'module',
            });
        },
    };

    loader.init().then((monaco) => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    uri: 'formSchema',
                    fileMatch: ['*'],
                    schema: jsonSchema,
                },
            ],
        });
    });
};
