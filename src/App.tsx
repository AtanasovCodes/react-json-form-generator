import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useCallback, useState } from 'react';

import type { Group } from './types/form-schema.type';

import { ViewSwitcher, FormRenderer, JSONModal, SchemaEditor } from './components';
import { generateJSON } from './components/form-renderer/utils';
import { exampleSchemes } from './data/dev';

function App() {
    const [formValues, setFormValues] = useState<Record<string, unknown>>({});
    const [schema, setSchema] = useState<Group>(exampleSchemes.dynamicValidationFormSchema);
    const [submittedJson, setSubmittedJson] = useState<Record<string, unknown> | null>(null);
    const [view, setView] = useState<'grid' | 'row'>('grid');
    const [selectedSchemaId, setSelectedSchemaId] = useState<string>('dynamicValidationFormSchema');

    const handleChange = useCallback((id: string, value: unknown) => {
        setFormValues((prev) => ({ ...prev, [id]: value }));
    }, []);

    const handleViewChange = useCallback((event: React.MouseEvent<HTMLElement>, newView: 'grid' | 'row') => {
        if (newView) {
            setView(newView);
        }
    }, []);

    const handleSubmit = () => {
        const output = generateJSON(schema, formValues);
        setSubmittedJson(output);
    };

    const handleSchemaChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedKey = event.target.value as keyof typeof exampleSchemes;
        const selectedSchema = exampleSchemes[selectedKey];
        setSelectedSchemaId(selectedKey);
        setSchema(selectedSchema);
        setFormValues({});
        setSubmittedJson(null);
    };

    return (
        <Container maxWidth="xl">
            <ViewSwitcher view={view} onChange={handleViewChange} />
            <Grid
                container
                direction={view === 'row' ? 'column' : 'row'} // Toggle between row and grid
                sx={{
                    flexDirection: { xs: 'column', sm: view === 'grid' ? 'row' : 'column' }, // Force row on mobile
                }}
                spacing={4}
                padding={4}
            >
                <Grid
                    size={{
                        xs: 12,
                        sm: view === 'grid' ? 6 : 12,
                    }}
                    component="aside"
                    aria-label="Schema Editor"
                >
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="schema-select-label">Select Example Schema</InputLabel>
                        <Select
                            labelId="schema-select-label"
                            value={selectedSchemaId}
                            onChange={handleSchemaChange}
                            label="Select Example Schema"
                        >
                            {Object.entries(exampleSchemes).map(([key, example]) => (
                                <MenuItem key={key} value={key}>
                                    {example.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <SchemaEditor initialSchema={schema} onSchemaChange={setSchema} />
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
                        <FormRenderer schema={schema} formValues={formValues} onChange={handleChange} />
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
