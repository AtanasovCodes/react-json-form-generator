import { Box, Button, Container, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import type { ExampleSchemeKey } from './data/dev/example-schemes';
import type { Group } from './types/form-schema.type';

import { ViewSwitcher, FormRenderer, JSONModal, SchemaSelector, SchemaEditorContainer } from './components';
import { generateJSON } from './components/form-renderer/utils';
import { AUTO_SAVE_KEY } from './constants';
import { exampleSchemes } from './data/dev';
import { AutoSaveService } from './services';

const autoSaveSchema = new AutoSaveService<Group>({
    version: '1.0.0',
    validate: (data): data is Group => !!data && typeof data === 'object',
});

const autoSaveValues = new AutoSaveService<Record<string, unknown>>({
    version: '1.0.0',
    validate: (data): data is Record<string, unknown> => !!data && typeof data === 'object',
});

function App() {
    const [formValues, setFormValues] = useState<Record<string, unknown>>(() => {
        const savedValues = autoSaveValues.load(`values:${AUTO_SAVE_KEY}`);
        return savedValues ? savedValues : {};
    });
    const [schema, setSchema] = useState<Group>(() => {
        const savedSchema = autoSaveSchema.load(AUTO_SAVE_KEY);
        return savedSchema ? savedSchema : exampleSchemes.blankSchema;
    });
    const [submittedJson, setSubmittedJson] = useState<Record<string, unknown> | null>(null);
    const [view, setView] = useState<'grid' | 'row'>('grid');
    const [selectedSchemaId, setSelectedSchemaId] = useState<ExampleSchemeKey>('blankSchema');

    const handleFormChange = useCallback((id: string, value: unknown) => {
        setFormValues((prev) => ({ ...prev, [id]: value }));
    }, []);

    const handleViewChange = useCallback((_event: React.MouseEvent<HTMLElement>, newView: 'grid' | 'row') => {
        if (newView) {
            setView(newView);
        }
    }, []);

    const handleSubmit = () => {
        const output = generateJSON(schema, formValues);
        setSubmittedJson(output);
    };

    useEffect(() => {
        autoSaveSchema.save(AUTO_SAVE_KEY, schema);
    }, [schema]);

    useEffect(() => {
        autoSaveValues.save(`values:${AUTO_SAVE_KEY}`, formValues);
    }, [formValues]);

    useEffect(() => {
        return () => {
            autoSaveValues.cancel();
            autoSaveSchema.cancel();
        };
    }, []);

    return (
        <Container maxWidth="xl">
            <ViewSwitcher view={view} onChange={handleViewChange} />
            <Grid
                container
                direction={view === 'row' ? 'column' : 'row'}
                sx={{
                    flexDirection: { xs: 'column', sm: view === 'grid' ? 'row' : 'column' }, // Force row on mobile
                }}
                spacing={4}
                padding={{ xs: 0, sm: 4 }}
            >
                <Grid
                    size={{
                        xs: 12,
                        sm: view === 'grid' ? 6 : 12,
                    }}
                    component="aside"
                    aria-label="Schema Editor"
                >
                    <SchemaSelector
                        selectedSchemaId={selectedSchemaId}
                        setSelectedSchemaId={setSelectedSchemaId}
                        setSchema={setSchema}
                        setFormValues={setFormValues}
                        setSubmittedJson={setSubmittedJson}
                    />
                    <SchemaEditorContainer schema={schema} setSchema={setSchema} />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: view === 'grid' ? 6 : 12,
                    }}
                    component="main"
                    aria-label="Dynamic Form"
                >
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <FormRenderer schema={schema} formValues={formValues} onChange={handleFormChange} />
                        <Box sx={{ mt: 2 }} component="footer">
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {submittedJson && (
                <JSONModal open={!!submittedJson} onClose={() => setSubmittedJson(null)} jsonData={submittedJson} />
            )}
        </Container>
    );
}

export default App;
