import type { Group } from '../../types/form-schema.type';

export interface SchemaEditorProps {
    schema: Group;
    handleSchemaChange: (updatedSchema: Group) => void;
    error?: string | null;
}
