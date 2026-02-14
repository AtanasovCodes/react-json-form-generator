import type { Group } from '../../types/form-schema.type';

const simpleFormSchema: Group = {
    id: 'root',
    type: 'group',
    label: 'Simple Form',
    children: [
        {
            id: 'firstName',
            label: 'First Name',
            type: 'text',
        },
        {
            id: 'lastName',
            label: 'Last Name',
            type: 'text',
        },
        {
            id: 'email',
            label: 'Email',
            type: 'text',
        },
    ],
};

const nestedGroupSchema: Group = {
    id: 'root',
    type: 'group',
    label: 'Nested Form',
    children: [
        {
            id: 'personalInfo',
            type: 'group',
            label: 'Personal Information',
            children: [
                {
                    id: 'name',
                    label: 'Name',
                    type: 'text',
                },
                {
                    id: 'email',
                    label: 'Email',
                    type: 'text',
                },
            ],
        },
        {
            id: 'feedback',
            type: 'group',
            label: 'Feedback',
            children: [
                {
                    id: 'satisfaction',
                    label: 'Satisfaction Level',
                    type: 'dropdown',
                    options: [
                        {
                            label: 'Very Satisfied',
                            value: 'very_satisfied',
                        },
                        {
                            label: 'Satisfied',
                            value: 'satisfied',
                        },
                        {
                            label: 'Neutral',
                            value: 'neutral',
                        },
                        {
                            label: 'Dissatisfied',
                            value: 'dissatisfied',
                        },
                        {
                            label: 'Very Dissatisfied',
                            value: 'very_dissatisfied',
                        },
                    ],
                },
                {
                    id: 'comments',
                    label: 'Additional Comments',
                    type: 'text',
                },
            ],
        },
    ],
};

const dynamicFormSchema: Group = {
    id: 'root',
    type: 'group',
    label: 'Dynamic Visibility Form',
    children: [
        {
            id: 'hasPet',
            label: 'Do you have a pet?',
            type: 'dropdown',
            options: [
                {
                    label: 'Yes',
                    value: 'yes',
                },
                {
                    label: 'No',
                    value: 'no',
                },
            ],
        },
        {
            id: 'petType',
            label: 'Type of Pet',
            type: 'text',
            visibilityCondition: {
                fieldId: 'hasPet',
                operator: 'equals',
                value: 'yes',
            },
        },
    ],
};

const dynamicValidationFormSchema: Group = {
    type: 'group',
    id: 'root',
    label: 'Dynamic Validation Form',
    children: [
        {
            id: 'identificationType',
            type: 'dropdown',
            label: 'Identification Type',
            options: [
                { label: 'Personal ID', value: 'personalId' },
                { label: 'Passport', value: 'passport' },
            ],
            validationRules: [
                {
                    type: 'required',
                    message: 'Identification Type is required.',
                },
            ],
        },
        {
            id: 'identificationNumber',
            type: 'text',
            label: 'Identification Number',
            validationRules: [
                {
                    type: 'required',
                    message: 'This field is required.',
                },
                {
                    type: 'pattern',
                    value: '^[0-9]+$',
                    message: 'Must be a numeric value.',
                    dependsOn: {
                        fieldId: 'identificationType',
                        value: 'personalId',
                    },
                },
                {
                    type: 'pattern',
                    value: '^[A-Za-z0-9]+$',
                    message: 'Must be an alphanumeric value.',
                    dependsOn: {
                        fieldId: 'identificationType',
                        value: 'passport',
                    },
                },
            ],
        },
        {
            id: 'description',
            type: 'textarea',
            label: 'Description',
            validationRules: [
                {
                    type: 'maxLength',
                    value: 100,
                    message: 'Description must be less than 100 characters.',
                },
                {
                    type: 'minLength',
                    value: 10,
                    message: 'Description must be at least 10 characters.',
                },
            ],
        },
        {
            id: 'userType',
            type: 'dropdown',
            label: 'User Type',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Editor', value: 'editor' },
                { label: 'Viewer', value: 'viewer' },
            ],
            validationRules: [
                {
                    type: 'required',
                    message: 'User Type is required.',
                },
            ],
        },
    ],
};

const autoFillSchema: Group = {
    id: 'root',
    type: 'group',
    label: 'Auto-Fill Form',
    children: [
        {
            id: 'firstName',
            label: 'First Name',
            type: 'text',
        },
        {
            id: 'lastName',
            label: 'Last Name',
            type: 'text',
        },
        {
            id: 'fullName',
            label: 'Full Name',
            type: 'text',
            autoFill: {
                api: 'fetchUserData',
                inputFields: ['firstName', 'lastName'],
                targetFields: ['fullName', 'email'],
            },
        },
        {
            id: 'email',
            label: 'Email',
            type: 'text',
        },
        {
            id: 'postalCode',
            label: 'Postal Code',
            type: 'text',
        },
        {
            id: 'city',
            label: 'City',
            type: 'text',
            autoFill: {
                api: 'fetchAddress',
                inputFields: ['postalCode'],
                targetFields: ['city', 'country'],
            },
        },
        {
            id: 'country',
            label: 'Country',
            type: 'text',
        },
    ],
};

const schemes = {
    simpleFormSchema,
    nestedGroupSchema,
    dynamicFormSchema,
    autoFillSchema,
    dynamicValidationFormSchema,
} as const;

export type ExampleSchemeKey = keyof typeof schemes;

export default schemes;
