import {
    TextField,
    Checkbox,
    FormControlLabel,
    RadioGroup,
    Radio,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';

import type { FieldRendererProps } from './field-renderer.props';

import { validateField } from '@components/form-renderer/utils/validation';

const FieldRenderer = ({ field, value, onChange, formValues, isLoading }: FieldRendererProps) => {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const validationError = validateField(newValue, field.validationRules, formValues);

        setError(validationError);
        onChange(field.id, newValue);
    };

    switch (field.type) {
        case 'text':
            return (
                <TextField
                    label={field.label}
                    value={value || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    helperText={error}
                    error={!!error}
                    disabled={isLoading}
                    slotProps={{
                        input: {
                            endAdornment: isLoading && <CircularProgress size={18} />,
                        },
                    }}
                />
            );
        case 'textarea':
            return (
                <TextField
                    label={field.label}
                    value={value || ''}
                    onChange={handleChange}
                    multiline={field.type === 'textarea'}
                    fullWidth
                    margin="normal"
                    helperText={error}
                    disabled={isLoading}
                    error={!!error}
                    slotProps={{
                        input: {
                            endAdornment: isLoading && <CircularProgress size={18} />,
                        },
                    }}
                />
            );

        case 'checkbox':
            return (
                <FormControlLabel
                    control={<Checkbox checked={!!value} onChange={handleChange} />}
                    label={field.label}
                />
            );

        case 'radio':
            return (
                <FormControl component="fieldset" margin="normal">
                    <InputLabel id={`radio-label-${field.id}`}>{field.label}</InputLabel>
                    <RadioGroup aria-labelledby={`radio-label-${field.id}`} value={value || ''} onChange={handleChange}>
                        {field.options.map((opt) => (
                            <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
        case 'dropdown':
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel id={`select-label-${field.id}`}>{field.label}</InputLabel>
                    <Select
                        labelId={`select-label-${field.id}`}
                        value={value || ''}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                    >
                        {field.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText error>{error}</FormHelperText>}
                </FormControl>
            );

        default:
            return null;
    }
};

export default FieldRenderer;
