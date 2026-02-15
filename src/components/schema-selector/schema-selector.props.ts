import React from 'react';

import type { Group } from '../../types/form-schema.type';

export interface SchemaSelectorProps {
    setSchema: React.Dispatch<React.SetStateAction<Group>>;
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
    setSubmittedJson: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>;
}
