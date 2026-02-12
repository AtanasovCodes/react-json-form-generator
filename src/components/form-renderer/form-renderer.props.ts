import type { Group } from '../../types/form-schema.type';

export interface FormRendererProps {
    schema: Group;
    formValues: Record<string, unknown>;
    onChange: (id: string, value: unknown) => void;
}
