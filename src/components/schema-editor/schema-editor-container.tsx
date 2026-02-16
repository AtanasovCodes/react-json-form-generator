import React from 'react';

import type { SchemaEditorContainerProps } from './schema-editor-container.props';
import type { Group } from '../../types/form-schema.type';

import SchemaEditor from './schema-editor';

const SchemaEditorContainer = ({ schema, setSchema }: SchemaEditorContainerProps) => {
    const handleSchemaChange = (updatedSchema: Group) => {
        setSchema(updatedSchema);
    };

    return <SchemaEditor schema={schema} handleSchemaChange={handleSchemaChange} />;
};

export default React.memo(SchemaEditorContainer);
