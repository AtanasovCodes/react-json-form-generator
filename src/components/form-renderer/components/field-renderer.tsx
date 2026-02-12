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
} from '@mui/material';

import type { FieldRendererProps } from './field-renderer.props';

const FieldRenderer = ({ field, value, onChange }: FieldRendererProps) => {
    switch (field.type) {
        case 'text':
            return (
                <TextField
                    label={field.label}
                    value={value || ''}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    fullWidth
                    margin="normal"
                />
            );
        case 'textarea':
            return (
                <TextField
                    label={field.label}
                    value={value || ''}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    multiline={field.type === 'textarea'}
                    fullWidth
                    margin="normal"
                />
            );

        case 'checkbox':
            return (
                <FormControlLabel
                    control={<Checkbox checked={!!value} onChange={(e) => onChange(field.id, e.target.checked)} />}
                    label={field.label}
                />
            );

        case 'radio':
            return (
                <FormControl component="fieldset" margin="normal">
                    <InputLabel id={`radio-label-${field.id}`}>{field.label}</InputLabel>
                    <RadioGroup
                        aria-labelledby={`radio-label-${field.id}`}
                        value={value || ''}
                        onChange={(e) => onChange(field.id, e.target.value)}
                    >
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
                        onChange={(e) => onChange(field.id, e.target.value)}
                    >
                        {field.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );

        default:
            return null;
    }
};

export default FieldRenderer;
