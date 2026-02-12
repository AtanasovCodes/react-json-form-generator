import { Box, Button, Container, Grid } from '@mui/material';
import { useState } from 'react';

import type { Group } from './types/form-schema.type';

import { FormRenderer } from './components/form-renderer';
import { SchemaEditor } from './components/schema-editor';
import { exampleSchema } from './data/dev';

function App() {
    const [formValues, setFormValues] = useState<Record<string, unknown>>({});
    const [schema, setSchema] = useState<Group>(exampleSchema as Group);

    const handleChange = (id: string, value: unknown) => {
        setFormValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        console.log('Submitted JSON:', formValues);
        alert(JSON.stringify(formValues, null, 2));
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
        </Container>
    );
}

export default App;
