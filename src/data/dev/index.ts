import type { Group } from '../../types/form-schema.type';

export const exampleSchema: Group = {
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
                    value: /^[0-9]+$/,
                    message: 'Must be a numeric value.',
                    dependsOn: {
                        fieldId: 'identificationType',
                        value: 'personalId',
                    },
                },
                {
                    type: 'pattern',
                    value: /^[A-Za-z0-9]+$/,
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
        {
            id: 'acceptTerms',
            type: 'checkbox',
            label: 'Accept Terms and Conditions',
            validationRules: [
                {
                    type: 'required',
                    message: 'You must accept the terms and conditions.',
                },
            ],
        },
        {
            id: 'gender',
            type: 'radio',
            label: 'Gender',
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
            validationRules: [
                {
                    type: 'required',
                    message: 'Gender is required.',
                },
            ],
        },
    ],
};
