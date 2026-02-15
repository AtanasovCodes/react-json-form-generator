import { describe, it, expect } from 'vitest';

import type { Group } from '../../../../types/form-schema.type';

import schemaHasValidation from './schema-validation.utils';

describe('schemaHasValidation', () => {
    it('should return false if the group has no children', () => {
        const group: Group = {
            id: 'root',
            type: 'group',
            children: [],
        };

        const result = schemaHasValidation(group);
        expect(result).toBe(false);
    });

    it('should return false if none of the children have validation rules', () => {
        const group: Group = {
            id: 'root',
            type: 'group',
            children: [
                { id: 'field1', type: 'text', validationRules: [] },
                { id: 'field2', type: 'number' },
            ],
        };

        const result = schemaHasValidation(group);
        expect(result).toBe(false);
    });

    it('should return true if at least one child has validation rules', () => {
        const group: Group = {
            id: 'root',
            type: 'group',
            children: [
                { id: 'field1', type: 'text', validationRules: [] },
                {
                    id: 'field2',
                    type: 'text',
                    validationRules: [{ type: 'required', message: 'This field is required' }],
                },
            ],
        };

        const result = schemaHasValidation(group);
        expect(result).toBe(true);
    });

    it('should return true if a nested group contains validation rules', () => {
        const group: Group = {
            id: 'root',
            type: 'group',
            children: [
                {
                    id: 'group1',
                    type: 'group',
                    children: [
                        {
                            id: 'field1',
                            type: 'text',
                            validationRules: [{ type: 'required', message: 'This field is required' }],
                        },
                    ],
                },
            ],
        };

        const result = schemaHasValidation(group);
        expect(result).toBe(true);
    });

    it('should return false for an empty group', () => {
        const group: Group = {
            id: 'root',
            type: 'group',
            children: [],
        };

        const result = schemaHasValidation(group);
        expect(result).toBe(false);
    });
});
