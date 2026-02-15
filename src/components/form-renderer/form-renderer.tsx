import { Paper, Box, Typography } from '@mui/material';

import type { FormRendererProps } from './form-renderer.props';

import type { Field, Group } from '@app-types/form-schema.type';

import { FieldRenderer } from './components';
import { useAutoFill } from './hooks';
import { evaluateVisibility } from './utils';

const FormRenderer = ({ schema, formValues, onChange }: FormRendererProps) => {
    useAutoFill({ schema, formValues, onChange });
    return (
        <Paper variant="outlined" sx={{ padding: 2, marginY: 2 }}>
            <Typography variant="h5" gutterBottom data-testid={`form-title-${schema.id}`}>
                {schema.label}
            </Typography>
            <Box>
                {schema.children?.map((child: Field | Group) => {
                    const isChildVisible = evaluateVisibility(child.visibilityCondition, formValues);
                    if (!isChildVisible) {
                        return null;
                    }

                    if (child.type === 'group') {
                        return (
                            <FormRenderer key={child.id} schema={child} formValues={formValues} onChange={onChange} />
                        );
                    }

                    return (
                        <FieldRenderer
                            key={child.id}
                            field={child}
                            value={formValues[child.id]}
                            onChange={onChange}
                            formValues={formValues}
                        />
                    );
                })}
            </Box>
        </Paper>
    );
};

export default FormRenderer;
