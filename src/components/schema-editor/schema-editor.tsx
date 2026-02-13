import Editor, { useMonaco } from '@monaco-editor/react';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import type { SchemaEditorProps } from './schema-editor.props';

const SchemaEditor = ({ initialSchema, onSchemaChange }: SchemaEditorProps) => {
    const [text, setText] = useState(JSON.stringify(initialSchema, null, 2));
    const monaco = useMonaco();

    const handleEditorChange = (value: string | undefined) => {
        if (!value) return;

        setText(value);

        try {
            const parsed = JSON.parse(value);
            onSchemaChange(parsed);

            if (monaco) {
                const model = monaco.editor.getModels()[0];
                monaco.editor.setModelMarkers(model, 'json', []);
            }
        } catch (err: unknown) {
            if (err instanceof SyntaxError) {
                console.error('JSON parsing error:', err.message);
            }
            if (monaco) {
                const model = monaco.editor.getModels()[0];
                monaco.editor.setModelMarkers(model, 'json', [
                    {
                        startLineNumber: 1,
                        startColumn: 1,
                        endLineNumber: 1,
                        endColumn: 1,
                        message: 'Invalid JSON format',
                        severity: monaco.MarkerSeverity.Error,
                    },
                ]);
            }
        }
    };

    return (
        <Box
            mb={4}
            sx={{
                height: { xs: '300px', sm: '400px', md: '600px' },
                overflow: 'hidden',
                border: '1px solid #ccc',
                borderRadius: '8px',
                p: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                JSON Form Schema
            </Typography>
            <Editor
                height="100%"
                defaultLanguage="json"
                value={text}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    tabSize: 2,
                    fontSize: 16,
                }}
            />
        </Box>
    );
};

export default React.memo(SchemaEditor);
