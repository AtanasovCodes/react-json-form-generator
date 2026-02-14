import React from 'react';

import type { Group } from '../../types/form-schema.type';

export interface SchemaSelectorProps {
    selectedSchemaId: string;
    setSelectedSchemaId: React.Dispatch<React.SetStateAction<string>>;
    setSchema: React.Dispatch<React.SetStateAction<Group>>;
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
    setSubmittedJson: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>;
}
