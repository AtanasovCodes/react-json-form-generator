import type { Group } from '../../types/form-schema.type';

export const exampleSchema: Group = {
    type: 'group',
    id: 'root',
    label: 'Test Form',
    children: [
        {
            id: 'userType',
            type: 'dropdown',
            label: 'User Type',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Editor', value: 'editor' },
                { label: 'Viewer', value: 'viewer' },
            ],
        },
        {
            id: 'age',
            type: 'text',
            label: 'Age',
        },
        {
            id: 'adminCode',
            type: 'text',
            label: 'Admin Code',
            visibilityCondition: {
                fieldId: 'userType',
                operator: 'equals',
                value: 'admin',
            },
        },
        {
            id: 'editorCode',
            type: 'text',
            label: 'Editor Code',
            visibilityCondition: {
                fieldId: 'userType',
                operator: 'notEquals',
                value: 'admin',
            },
        },
        {
            id: 'ageAbove18',
            type: 'text',
            label: 'Age Above 18',
            visibilityCondition: {
                fieldId: 'age',
                operator: 'greaterThan',
                value: 18,
            },
        },
        {
            id: 'ageBelow60',
            type: 'text',
            label: 'Age Below 60',
            visibilityCondition: {
                fieldId: 'age',
                operator: 'lessThan',
                value: 60,
            },
        },
    ],
};
