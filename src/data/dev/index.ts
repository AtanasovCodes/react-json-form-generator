import type { Group } from '../../types/form-schema.type';

export const exampleSchema: Group = {
    type: 'group',
    id: 'root',
    label: 'User Information Form',
    children: [
        {
            id: 'name',
            type: 'text',
            label: 'Name',
            validationRules: [
                {
                    type: 'required',
                    message: 'Name is required.',
                },
            ],
        },
        {
            id: 'email',
            type: 'text',
            label: 'Email',
            validationRules: [
                {
                    type: 'required',
                    message: 'Email is required.',
                },
                {
                    type: 'pattern',
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Email must be a valid email address.',
                },
            ],
        },
        {
            id: 'userType',
            type: 'dropdown',
            label: 'User Type',
            options: [
                { label: 'Individual', value: 'individual' },
                { label: 'Business', value: 'business' },
            ],
            validationRules: [
                {
                    type: 'required',
                    message: 'User Type is required.',
                },
            ],
        },
        {
            type: 'group',
            id: 'businessDetails',
            label: 'Business Details',
            visibilityCondition: {
                fieldId: 'userType',
                operator: 'equals',
                value: 'business',
            },
            children: [
                {
                    id: 'businessName',
                    type: 'text',
                    label: 'Business Name',
                    validationRules: [
                        {
                            type: 'required',
                            message: 'Business Name is required for businesses.',
                        },
                    ],
                },
                {
                    id: 'businessTaxId',
                    type: 'text',
                    label: 'Tax ID',
                    validationRules: [
                        {
                            type: 'required',
                            message: 'Tax ID is required for businesses.',
                        },
                        {
                            type: 'pattern',
                            value: /^[0-9]{9}$/,
                            message: 'Tax ID must be a 9-digit number.',
                        },
                    ],
                },
            ],
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
                    validationRules: [
                        {
                            type: 'required',
                            message: 'Street is required.',
                        },
                    ],
                },
                {
                    id: 'city',
                    type: 'text',
                    label: 'City',
                    validationRules: [
                        {
                            type: 'required',
                            message: 'City is required.',
                        },
                    ],
                },
                {
                    id: 'zipCode',
                    type: 'text',
                    label: 'Zip Code',
                    validationRules: [
                        {
                            type: 'pattern',
                            value: /^[0-9]{5}$/,
                            message: 'Zip Code must be a 5-digit number.',
                        },
                    ],
                },
            ],
        },
    ],
};
