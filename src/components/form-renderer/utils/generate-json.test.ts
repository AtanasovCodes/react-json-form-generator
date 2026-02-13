import { describe, it, expect } from 'vitest';

import type { Group } from '../../../types/form-schema.type';

import generateJSON from './generate-json.utils';

describe('generateJSON', () => {
    const schema: Group = {
        type: 'group',
        id: 'root',
        label: 'Root Group',
        children: [
            {
                id: 'name',
                type: 'text',
                label: 'Name',
            },
            {
                id: 'age',
                type: 'text',
                label: 'Age',
            },
            {
                type: 'group',
                id: 'addressGroup',
                label: 'Address',
                children: [
                    {
                        id: 'street',
                        type: 'text',
                        label: 'Street',
                    },
                    {
                        id: 'city',
                        type: 'text',
                        label: 'City',
                    },
                ],
            },
        ],
    };

    it('should generate JSON for a flat schema', () => {
        const formValues = {
            name: 'John Doe',
            age: 30,
        };

        const result = generateJSON(schema, formValues);

        expect(result).toEqual({
            name: 'John Doe',
            age: 30,
            addressGroup: {
                street: null,
                city: null,
            },
        });
    });

    it('should generate JSON for a nested schema', () => {
        const formValues = {
            name: 'Jane Doe',
            age: 25,
            street: '123 Main St',
            city: 'New York',
        };

        const result = generateJSON(schema, formValues);

        expect(result).toEqual({
            name: 'Jane Doe',
            age: 25,
            addressGroup: {
                street: '123 Main St',
                city: 'New York',
            },
        });
    });

    it('should handle empty form values', () => {
        const formValues = {};

        const result = generateJSON(schema, formValues);

        expect(result).toEqual({
            name: null,
            age: null,
            addressGroup: {
                street: null,
                city: null,
            },
        });
    });

    it('should exclude fields or groups with visibilityCondition set to false', () => {
        const schemaWithVisibility: Group = {
            type: 'group',
            id: 'root',
            label: 'Root Group',
            children: [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Name',
                },
                {
                    id: 'age',
                    type: 'text',
                    label: 'Age',
                },
                {
                    type: 'group',
                    id: 'addressGroup',
                    label: 'Address',
                    visibilityCondition: {
                        fieldId: 'showAddress',
                        operator: 'equals',
                        value: true,
                    },
                    children: [
                        {
                            id: 'street',
                            type: 'text',
                            label: 'Street',
                        },
                        {
                            id: 'city',
                            type: 'text',
                            label: 'City',
                        },
                    ],
                },
            ],
        };

        const formValues = {
            name: 'John Doe',
            age: 30,
            showAddress: false,
        };

        const result = generateJSON(schemaWithVisibility, formValues);

        expect(result).toEqual({
            name: 'John Doe',
            age: 30,
        });
    });

    it('should include fields or groups with visibilityCondition set to true', () => {
        const schemaWithVisibility: Group = {
            type: 'group',
            id: 'root',
            label: 'Root Group',
            children: [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Name',
                },
                {
                    id: 'age',
                    type: 'text',
                    label: 'Age',
                },
                {
                    type: 'group',
                    id: 'addressGroup',
                    label: 'Address',
                    visibilityCondition: {
                        fieldId: 'showAddress',
                        operator: 'equals',
                        value: true,
                    },
                    children: [
                        {
                            id: 'street',
                            type: 'text',
                            label: 'Street',
                        },
                        {
                            id: 'city',
                            type: 'text',
                            label: 'City',
                        },
                    ],
                },
            ],
        };

        const formValues = {
            name: 'John Doe',
            age: 30,
            showAddress: true,
            street: '456 Elm St',
            city: 'San Francisco',
        };

        const result = generateJSON(schemaWithVisibility, formValues);

        expect(result).toEqual({
            name: 'John Doe',
            age: 30,
            addressGroup: {
                street: '456 Elm St',
                city: 'San Francisco',
            },
        });
    });
});
