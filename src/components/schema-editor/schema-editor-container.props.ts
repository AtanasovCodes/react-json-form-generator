import type { Group } from '../../types/form-schema.type';

export interface SchemaEditorContainerProps {
    schema: Group;
    setSchema: (schema: Group) => void;
}
