import React, { useState } from 'react';
import * as yup from 'yup';

import type { SchemaEditorContainerProps } from './schema-editor-container.props';
import type { Group } from '../../types/form-schema.type';

import SchemaEditor from './schema-editor';
import { groupSchemaValidation } from './schema-editor.validation';

const SchemaEditorContainer = ({ schema, setSchema }: SchemaEditorContainerProps) => {
    const [error, setError] = useState<string | null>(null);

    const handleSchemaChange = (updatedSchema: Group) => {
        try {
            groupSchemaValidation.validateSync(updatedSchema, { abortEarly: false });
            setError(null);
            setSchema(updatedSchema);
        } catch (err: unknown) {
            if (yup.ValidationError.isError(err)) {
                setError(err.errors.join(', '));
            }
        }
    };

    return <SchemaEditor schema={schema} handleSchemaChange={handleSchemaChange} error={error} />;
};

export default React.memo(SchemaEditorContainer);
