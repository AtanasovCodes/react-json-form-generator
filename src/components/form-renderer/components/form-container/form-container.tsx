import { Box, Button } from '@mui/material';
import React from 'react';

import type { FormContainerProps } from './form-container.props';

import { FormRenderer } from '@components/form-renderer';
import { useFormValidation } from '@components/form-renderer/hooks';

const FormContainer = ({ schema, formValues, onFormChange, onSubmit }: FormContainerProps) => {
    const { isValid } = useFormValidation(schema, formValues);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) {
            return;
        }
        onSubmit();
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <FormRenderer schema={schema} formValues={formValues} onChange={onFormChange} />
            <Box sx={{ mt: 2 }} component="footer">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default FormContainer;
