import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';

import type { Group } from '../../types/form-schema.type';

import { exampleSchema } from '../../data/dev';

import SchemaEditor from './schema-editor';

describe('SchemaEditor', () => {
    it('renders the initial schema JSON in the textarea', () => {
        const onSchemaChange = vi.fn();
        render(<SchemaEditor initialSchema={exampleSchema as Group} onSchemaChange={onSchemaChange} />);

        const textbox = screen.getByRole('textbox') as HTMLTextAreaElement;
        expect(textbox).toBeInTheDocument();
        expect(textbox.value).toBe(JSON.stringify(exampleSchema, null, 2));
    });

    it('parses valid JSON and calls onSchemaChange with the parsed object', async () => {
        const onSchemaChange = vi.fn();
        render(<SchemaEditor initialSchema={exampleSchema as Group} onSchemaChange={onSchemaChange} />);

        const textbox = screen.getByRole('textbox') as HTMLTextAreaElement;

        const newObj = { type: 'group', id: 'root', label: 'Changed', children: [] };
        const newJson = JSON.stringify(newObj, null, 2);

        fireEvent.change(textbox, { target: { value: newJson } });

        expect(onSchemaChange).toHaveBeenCalled();
        expect(onSchemaChange).toHaveBeenLastCalledWith(newObj);
    });
});
