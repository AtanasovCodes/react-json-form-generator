import { Container, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { ViewSwitcher, JSONModal, SchemaSelector, SchemaEditorContainer } from './components';
import { FormContainer } from './components/form-renderer/components';
import { useFormValidation } from './components/form-renderer/hooks';
import { generateJSON } from './components/form-renderer/utils';
import { useFormBuilder } from './hooks';

function App() {
    const { schema, setSchema, formValues, setFormValues } = useFormBuilder();
    const { isValid } = useFormValidation(schema, formValues);
    const [submittedJson, setSubmittedJson] = useState<Record<string, unknown> | null>(null);
    const [view, setView] = useState<'grid' | 'row'>('grid');

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
        <Container
            maxWidth="xl"
            sx={{
                py: 4,
            }}
        >
            <ViewSwitcher view={view} onChange={handleViewChange} />
            <Grid
                container
                direction={view === 'row' ? 'column' : 'row'}
                sx={{
                    flexDirection: { xs: 'column', sm: view === 'grid' ? 'row' : 'column' }, // Force row on mobile
                }}
                spacing={{ xs: 2, sm: 4 }}
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
