import React, { useEffect } from 'react';

import type { SchemaEditorContainerProps } from './schema-editor-container.props';
import type { Group } from '../../types/form-schema.type';

import { setupMonaco } from './monaco-setup';
import SchemaEditor from './schema-editor';

const SchemaEditorContainer = ({ schema, setSchema }: SchemaEditorContainerProps) => {
    useEffect(() => {
        setupMonaco();
    }, []);

    const handleSchemaChange = (updatedSchema: Group) => {
        setSchema(updatedSchema);
    };

    return <SchemaEditor schema={schema} handleSchemaChange={handleSchemaChange} />;
};

export default React.memo(SchemaEditorContainer);
