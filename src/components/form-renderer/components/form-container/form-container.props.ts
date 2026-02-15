import type { Group } from '../../../../types/form-schema.type';

export interface FormContainerProps {
    schema: Group;
    formValues: Record<string, unknown>;
    onFormChange: (id: string, value: unknown) => void;
    onSubmit: () => void;
}
