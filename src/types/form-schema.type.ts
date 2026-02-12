import type { VisibilityCondition } from '../components/form-renderer/types';

export type FieldType = 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'radio';

export interface BaseField {
    id: string;
    label: string;
    type: FieldType;
    visibilityCondition?: VisibilityCondition;
}

export interface TextField extends BaseField {
    type: 'text' | 'textarea';
    visibilityCondition?: VisibilityCondition;
}

export interface CheckboxField extends BaseField {
    type: 'checkbox';
    visibilityCondition?: VisibilityCondition;
}

export interface ConditionalField extends BaseField {
    visibilityCondition: VisibilityCondition;
}

export interface Option {
    label: string;
    value: string;
}

export interface SelectField extends BaseField {
    type: 'dropdown' | 'radio';
    options: Option[];
    visibilityCondition?: VisibilityCondition;
}

export type Field = TextField | CheckboxField | SelectField;

export interface Group {
    id: string;
    type: 'group';
    label?: string;
    visibilityCondition?: VisibilityCondition;
    children: Array<Field | Group>;
}
