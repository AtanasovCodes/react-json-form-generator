import { Paper, Box } from '@mui/material';

import type { FormRendererProps } from './form-renderer.props';
import type { Field, Group } from '../../types/form-schema.type';

import FieldRenderer from './components/field-renderer';

const FormRenderer = ({ schema, formValues, onChange }: FormRendererProps) => {
    return (
        <Paper variant="outlined" sx={{ padding: 2, marginY: 2 }}>
            <Box>
                {schema.children.map((child: Field | Group) => {
                    if (child.type === 'group') {
                        return (
                            <FormRenderer key={child.id} schema={child} formValues={formValues} onChange={onChange} />
                        );
                    }

                    return (
                        <FieldRenderer key={child.id} field={child} value={formValues[child.id]} onChange={onChange} />
                    );
                })}
            </Box>
        </Paper>
    );
};

export default FormRenderer;
