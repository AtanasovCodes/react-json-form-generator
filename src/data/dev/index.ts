export const exampleSchema = {
    type: 'group',
    id: 'root',
    label: 'Sample Dynamic Form',
    children: [
        {
            id: 'firstName',
            type: 'text',
            label: 'First Name',
        },
        {
            id: 'lastName',
            type: 'text',
            label: 'Last Name',
        },
        {
            id: 'bio',
            type: 'textarea',
            label: 'Short Bio',
        },
        {
            id: 'gender',
            type: 'radio',
            label: 'Gender',
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
            ],
        },
        {
            id: 'subscribe',
            type: 'checkbox',
            label: 'Subscribe to Newsletter',
        },
        {
            type: 'group',
            id: 'addressGroup',
            label: 'Address Details',
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
                {
                    id: 'country',
                    type: 'dropdown',
                    label: 'Country',
                    options: [
                        { label: 'United States', value: 'us' },
                        { label: 'Canada', value: 'ca' },
                        { label: 'United Kingdom', value: 'uk' },
                    ],
                },
            ],
        },
    ],
};
