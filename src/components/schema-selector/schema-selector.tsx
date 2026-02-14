import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

import type { SchemaSelectorProps } from './schema-selector.props';

import { exampleSchemes } from '../../data/dev';

const SchemaSelector = ({
    selectedSchemaId,
    setSelectedSchemaId,
    setSchema,
    setFormValues,
    setSubmittedJson,
}: SchemaSelectorProps) => {
    const handleSchemaChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedKey = event.target.value as keyof typeof exampleSchemes;
        const selectedSchema = exampleSchemes[selectedKey];
        setSelectedSchemaId(selectedKey);
        setSchema(selectedSchema);
        setFormValues({});
        setSubmittedJson(null);
    };
    return (
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
    );
};

export default React.memo(SchemaSelector);
