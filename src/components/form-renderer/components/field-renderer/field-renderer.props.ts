import type { Field } from '../../../../types/form-schema.type';

export interface FieldRendererProps {
    field: Field;
    value: unknown;
    onChange: (id: string, value: unknown) => void;
    formValues: Record<string, unknown>;
}
