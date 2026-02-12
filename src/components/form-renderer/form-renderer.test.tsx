import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, afterEach } from 'vitest';

import type { Group } from '../../types/form-schema.type';

import FormRenderer from './form-renderer';

const mockOnChange = vi.fn();

const mockSchema: Group = {
    type: 'group',
    id: 'root',
    label: 'Test Form',
    children: [
        { id: 'firstName', type: 'text', label: 'First Name' },
        { id: 'lastName', type: 'text', label: 'Last Name' },
        {
            type: 'group',
            id: 'nestedGroup',
            label: 'Nested Group',
            children: [
                { id: 'email', type: 'text', label: 'Email' },
                { id: 'phone', type: 'text', label: 'Phone' },
            ],
        },
    ],
};

describe('FormRenderer', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the form title', () => {
        render(<FormRenderer schema={mockSchema} formValues={{}} onChange={mockOnChange} />);
        expect(screen.getByTestId('form-title-root')).toHaveTextContent('Test Form');
    });

    it('renders all fields and nested groups', () => {
        render(<FormRenderer schema={mockSchema} formValues={{}} onChange={mockOnChange} />);
        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByTestId('form-title-nestedGroup')).toHaveTextContent('Nested Group');
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    });

    it('calls onChange when a field value changes', () => {
        render(<FormRenderer schema={mockSchema} formValues={{}} onChange={mockOnChange} />);
        const firstNameInput = screen.getByLabelText('First Name');
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        expect(mockOnChange).toHaveBeenCalledWith('firstName', 'John');
    });

    it('renders gracefully with an empty schema', () => {
        const emptySchema: Group = { type: 'group', id: 'empty', label: 'Empty Form', children: [] };
        render(<FormRenderer schema={emptySchema} formValues={{}} onChange={mockOnChange} />);
        expect(screen.getByTestId('form-title-empty')).toHaveTextContent('Empty Form');
    });

    it('handles invalid schema without crashing', () => {
        const invalidSchema = { type: 'group', id: 'invalid', label: 'Invalid Form' } as Group;
        render(<FormRenderer schema={invalidSchema} formValues={{}} onChange={mockOnChange} />);
        expect(screen.getByTestId('form-title-invalid')).toHaveTextContent('Invalid Form');
    });
});
