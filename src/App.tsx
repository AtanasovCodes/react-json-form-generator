import { Container, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';

import type { ExampleSchemeKey } from './data/dev/example-schemes';

import { ViewSwitcher, JSONModal, SchemaSelector, SchemaEditorContainer } from './components';
import { FormContainer } from './components/form-renderer/components';
import { useFormValidation } from './components/form-renderer/hooks';
import { generateJSON } from './components/form-renderer/utils';
import { useFormValuesState, useSchemaState } from './hooks';

function App() {
    const { schema, setSchema } = useSchemaState();
    const { formValues, setFormValues } = useFormValuesState();
    const { isValid } = useFormValidation(schema, formValues);
    const [submittedJson, setSubmittedJson] = useState<Record<string, unknown> | null>(null);
    const [view, setView] = useState<'grid' | 'row'>('grid');
    const [selectedSchemaId, setSelectedSchemaId] = useState<ExampleSchemeKey>('blankSchema');

    const handleFormChange = useCallback(
        (id: string, value: unknown) => {
            setFormValues((prev) => ({ ...prev, [id]: value }));
        },
        [setFormValues]
    );

    const handleViewChange = useCallback((_event: React.MouseEvent<HTMLElement>, newView: 'grid' | 'row') => {
        if (newView) {
            setView(newView);
        }
    }, []);

    const handleSubmit = () => {
        const output = generateJSON(schema, formValues);
        setSubmittedJson(output);
    };

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
                    <FormContainer
                        schema={schema}
                        formValues={formValues}
                        onFormChange={handleFormChange}
                        onSubmit={handleSubmit}
                        isValid={isValid}
                    />
                </Grid>
            </Grid>
            {submittedJson && (
                <JSONModal open={!!submittedJson} onClose={() => setSubmittedJson(null)} jsonData={submittedJson} />
            )}
        </Container>
    );
}

export default App;
