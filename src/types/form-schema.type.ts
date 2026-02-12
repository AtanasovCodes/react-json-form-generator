export type FieldType = 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'radio';

export interface BaseField {
    id: string;
    label: string;
    type: FieldType;
}

export interface TextField extends BaseField {
    type: 'text' | 'textarea';
}

export interface CheckboxField extends BaseField {
    type: 'checkbox';
}

export interface Option {
    label: string;
    value: string;
}

export interface SelectField extends BaseField {
    type: 'dropdown' | 'radio';
    options: Option[];
}

export type Field = TextField | CheckboxField | SelectField;

export interface Group {
    id: string;
    type: 'group';
    label?: string;
    children: Array<Field | Group>;
}
