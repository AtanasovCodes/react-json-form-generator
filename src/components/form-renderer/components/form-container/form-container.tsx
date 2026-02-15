import { Box, Button } from '@mui/material';
import React from 'react';

import type { FormContainerProps } from './form-container.props';

import { FormRenderer } from '@components/form-renderer';


const FormContainer = ({ schema, formValues, onFormChange, onSubmit, isValid }: FormContainerProps) => {
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
                <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default FormContainer;
