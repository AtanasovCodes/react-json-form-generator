import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

import type { SchemaSelectorProps } from './schema-selector.props';
import type { ExampleSchemeKey } from '../../data/examples/example-schemes';

import exampleSchemes from '../../data/examples/example-schemes';

const SchemaSelector = ({ setSchema, setFormValues, setSubmittedJson }: SchemaSelectorProps) => {
    const [selectedSchemaId, setSelectedSchemaId] = useState<ExampleSchemeKey>('blankSchema');

    const handleSchemaChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const schemaId = event.target.value as ExampleSchemeKey;

        setSelectedSchemaId(schemaId);
        setSchema(schemaId ? exampleSchemes[schemaId] : exampleSchemes.blankSchema);

        setFormValues({});
        setSubmittedJson(null);
    };

    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="schema-select-label">Select Example Schema</InputLabel>
            <Select
                labelId="schema-select-label"
                value={selectedSchemaId}
                //@ts-expect-error - MUI types are a bit off here
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
    );
};

export default React.memo(SchemaSelector);
