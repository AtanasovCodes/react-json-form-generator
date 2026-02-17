import { loader } from '@monaco-editor/react';
// To solve building issues with Monaco Editor and Vite, we need to import the workers directly
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

import jsonSchema from '@data/schema-definitions/form-schema.json';

export const setupMonaco = () => {
    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === 'json') {
                return new jsonWorker();
            }

            return new editorWorker();
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
