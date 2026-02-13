import type { Group } from '../../types/form-schema.type';

export const exampleSchema: Group = {
    id: 'root',
    type: 'group',
    label: 'User Form',
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
