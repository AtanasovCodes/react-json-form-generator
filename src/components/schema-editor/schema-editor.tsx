import { TextField, Typography, Box } from '@mui/material';
import React, { useState } from 'react';

import type { SchemaEditorProps } from './schema-editor.props';

const SchemaEditor = ({ initialSchema, onSchemaChange }: SchemaEditorProps) => {
    const [text, setText] = useState(JSON.stringify(initialSchema, null, 2));
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setText(newValue);

        try {
            const parsed = JSON.parse(newValue);
            setError('');
            onSchemaChange(parsed);
        } catch (err: unknown) {
            console.error('JSON parse error:', err);
            setError('Invalid JSON');
        }
    };

    return (
        <Box
            mb={4}
            sx={{
                height: { xs: '300px', sm: '400px', md: '500px' },
                overflow: 'auto',
            }}
        >
            <Typography variant="h6" gutterBottom>
                JSON Form Schema
            </Typography>
            <TextField
                multiline
                fullWidth
                minRows={10}
                value={text}
                onChange={handleChange}
                error={!!error}
                helperText={error || 'Enter JSON defining your form schema'}
                variant="outlined"
            />
        </Box>
    );
};

export default SchemaEditor;
