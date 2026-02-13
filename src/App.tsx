import { Box, Button, Container, Grid } from '@mui/material';
import { useState } from 'react';

import type { Group } from './types/form-schema.type';

import { FormRenderer } from './components/form-renderer';
import { generateJSON } from './components/form-renderer/utils';
import { JSONModal } from './components/json-modal';
import { SchemaEditor } from './components/schema-editor';
import { exampleSchema } from './data/dev';

function App() {
    const [formValues, setFormValues] = useState<Record<string, unknown>>({});
    const [schema, setSchema] = useState<Group>(exampleSchema as Group);
    const [submittedJson, setSubmittedJson] = useState<Record<string, unknown> | null>(null);

    const handleChange = (id: string, value: unknown) => {
        setFormValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        const output = generateJSON(schema, formValues);
        setSubmittedJson(output);
    };

    return (
        <Container maxWidth="xl">
            <Grid container spacing={4} padding={4} component="aside" aria-label="Schema Editor">
                <Grid size={6}>
                    <SchemaEditor initialSchema={schema} onSchemaChange={setSchema} />
                </Grid>
                <Grid size={6} component="main" aria-label="Dynamic Form">
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
