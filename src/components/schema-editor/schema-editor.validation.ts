import * as Yup from 'yup';

export const groupSchemaValidation = Yup.object({
    id: Yup.string().required('The "id" field is required.'),
    type: Yup.string()
        .oneOf(['group'], 'The root "type" must always be "group".')
        .required('The "type" field is required.'),
    label: Yup.string().optional(),
    children: Yup.array()
        .of(
            Yup.object({
                id: Yup.string().required('Each child must have an "id".'),
                type: Yup.string()
                    .oneOf(['group', 'text', 'number', 'dropdown', 'textarea'], 'Invalid "type" field in child.')
                    .required('Each child must have a "type".'),
                label: Yup.string().optional(),
                children: Yup.array(),
            }).noUnknown(true, 'Unknown property "${unknown}" is not allowed.')
        )
        .required('The "children" field is required.')
        .min(1, 'The "children" array must have at least one child.'),
}).noUnknown(true, 'Unknown property "${unknown}" is not allowed.');
