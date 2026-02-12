import type { Group } from '../../types/form-schema.type';

export interface SchemaEditorProps {
    initialSchema: Group;
    onSchemaChange: (schema: Group) => void;
}
