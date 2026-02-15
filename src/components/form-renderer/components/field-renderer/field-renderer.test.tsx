import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, afterEach } from 'vitest';

import type { FieldRendererProps } from './field-renderer.props';

import { Field } from '../../../../types/form-schema.type';

import FieldRenderer from './field-renderer';

const mockOnChange = vi.fn();

const renderField = (field: FieldRendererProps['field'], value: unknown = '') => {
    render(<FieldRenderer field={field} value={value} onChange={mockOnChange} formValues={{}} />);
};

describe('FieldRenderer', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders a TextField for text input', () => {
        const field: Field = { id: 'firstName', type: 'text', label: 'First Name' };
        renderField(field);

        const textField = screen.getByLabelText('First Name');
        expect(textField).toBeInTheDocument();
    });

    it('renders a TextField for textarea input', () => {
        const field: Field = { id: 'bio', type: 'textarea', label: 'Short Bio' };
        renderField(field);

        const textArea = screen.getByLabelText('Short Bio');
        expect(textArea).toBeInTheDocument();
    });

    it('renders a Checkbox for checkbox input', () => {
        const field: Field = { id: 'subscribe', type: 'checkbox', label: 'Subscribe to Newsletter' };
        renderField(field, true);

        const checkbox = screen.getByLabelText('Subscribe to Newsletter');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute('type', 'checkbox');
        expect(checkbox).toBeChecked();
    });

    it('renders a RadioGroup for radio input', () => {
        const field: Field = {
            id: 'gender',
            type: 'radio',
            label: 'Gender',
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
        };
        renderField(field, 'male');

        const radioGroup = screen.getByLabelText('Gender');
        expect(radioGroup).toBeInTheDocument();

        const maleRadio = screen.getByLabelText('Male');
        const femaleRadio = screen.getByLabelText('Female');

        expect(maleRadio).toBeInTheDocument();
        expect(femaleRadio).toBeInTheDocument();

        expect(maleRadio).toBeChecked();
        expect(femaleRadio).not.toBeChecked();
    });

    it('renders a Select for dropdown input', () => {
        const field: Field = {
            id: 'country',
            type: 'dropdown',
            label: 'Country',
            options: [
                { label: 'United States', value: 'us' },
                { label: 'Canada', value: 'ca' },
            ],
        };
        renderField(field, 'us');

        const select = screen.getByLabelText('Country');
        expect(select).toBeInTheDocument();
        expect(select).toHaveTextContent('United States');
    });

    it('does not render anything for unsupported field types', () => {
        //@ts-expect-error - This is intentional to test unsupported types
        const field: Field = { id: 'unknown', type: 'unsupported', label: 'Unsupported Field' };
        renderField(field);

        const unsupportedField = screen.queryByLabelText('Unsupported Field');
        expect(unsupportedField).not.toBeInTheDocument();
    });

    it('calls onChange when a field value changes', () => {
        const field: Field = { id: 'firstName', type: 'text', label: 'First Name' };
        renderField(field);

        const textField = screen.getByLabelText('First Name');
        fireEvent.change(textField, { target: { value: 'John' } });

        expect(mockOnChange).toHaveBeenCalledWith('firstName', 'John');
    });
});
