import Editor from '@monaco-editor/react';
import { Box, Typography, Alert } from '@mui/material';
import debounce from 'lodash.debounce';

import type { SchemaEditorProps } from './schema-editor.props';

const SchemaEditor = ({ schema, handleSchemaChange, error }: SchemaEditorProps) => {
    const handleEditorChange = debounce((value?: string) => {
        if (!value) return;
        try {
            const parsed = JSON.parse(value);
            handleSchemaChange(parsed);
        } catch {
            console.error('Invalid JSON:', value);
        }
    }, 300);

    return (
        <Box
            sx={{
                height: { xs: '300px', sm: '400px', md: '600px' },
                overflow: 'hidden',
                border: '1px solid #ccc',
                borderRadius: '8px',
                p: 2,
                mb: { xs: 2, sm: 4 },
            }}
        >
            <Typography variant="h6" gutterBottom>
                JSON Form Schema
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Editor
                height="100%"
                defaultLanguage="json"
                value={JSON.stringify(schema, null, 2)}
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

export default SchemaEditor;
