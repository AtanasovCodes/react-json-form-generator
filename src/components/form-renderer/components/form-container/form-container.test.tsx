import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

import { Group } from '../../../../types/form-schema.type';

import FormContainer from './form-container';

describe('FormContainer', () => {
    const mockSchema: Group = {
        id: 'root',
        type: 'group',
        label: 'Test Form',
        children: [
            {
                id: 'field1',
                type: 'text',
                label: 'Field 1',
                validationRules: [{ type: 'required', message: 'Field 1 is required' }],
            },
        ],
    };

    const mockFormValues = {
        field1: '',
    };

    const mockOnFormChange = vi.fn();
    const mockOnSubmit = vi.fn();

    it('should disable the submit button when the form is invalid', () => {
        render(
            <FormContainer
                schema={mockSchema}
                formValues={mockFormValues}
                onFormChange={mockOnFormChange}
                onSubmit={mockOnSubmit}
                isValid={false}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeDisabled();
    });

    it('should enable the submit button when the form is valid', () => {
        render(
            <FormContainer
                schema={mockSchema}
                formValues={{ field1: 'Some value' }}
                onFormChange={mockOnFormChange}
                onSubmit={mockOnSubmit}
                isValid={true}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).not.toBeDisabled();
    });

    it('should not call onSubmit when the form is invalid', () => {
        render(
            <FormContainer
                schema={mockSchema}
                formValues={mockFormValues}
                onFormChange={mockOnFormChange}
                onSubmit={mockOnSubmit}
                isValid={false}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should call onSubmit when the form is valid', () => {
        render(
            <FormContainer
                schema={mockSchema}
                formValues={{ field1: 'Some value' }}
                onFormChange={mockOnFormChange}
                onSubmit={mockOnSubmit}
                isValid={true}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);
        expect(mockOnSubmit).toHaveBeenCalled();
    });
});
