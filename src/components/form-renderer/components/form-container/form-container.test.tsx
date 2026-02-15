import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';

import { Group } from '../../../../types/form-schema.type';
import { useFormValidation } from '../../hooks';

import FormContainer from './form-container';

vi.mock('../../hooks', async () => {
    const actual = await vi.importActual<typeof import('../../hooks')>('../../hooks');

    return {
        ...actual,
        useFormValidation: vi.fn(),
    };
});

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

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should disable the submit button when the form is invalid', () => {
        (useFormValidation as vi.Mock).mockReturnValue({ isValid: false });
        render(
            <FormContainer
                schema={mockSchema}
                formValues={mockFormValues}
                onFormChange={mockOnFormChange}
                onSubmit={mockOnSubmit}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeDisabled();
    });

    it('should enable the submit button when the form is valid', () => {
        (useFormValidation as vi.Mock).mockReturnValue({ isValid: true });
        render(
            <FormContainer
                schema={mockSchema}
                formValues={{ field1: 'Some value' }}
                onFormChange={mockOnFormChange}
                onSubmit={mockOnSubmit}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).not.toBeDisabled();
    });

    it('should not call onSubmit when the form is invalid', () => {
        (useFormValidation as vi.Mock).mockReturnValue({ isValid: false });
        render(
            <FormContainer
                schema={mockSchema}
                formValues={mockFormValues}
                onFormChange={mockOnFormChange}
                onSubmit={mockOnSubmit}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should call onSubmit when the form is valid', () => {
        (useFormValidation as vi.Mock).mockReturnValue({ isValid: true });
        render(
            <FormContainer
                schema={mockSchema}
                formValues={{ field1: 'Some value' }}
                onFormChange={mockOnFormChange}
                onSubmit={mockOnSubmit}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);
        expect(mockOnSubmit).toHaveBeenCalled();
    });
});
