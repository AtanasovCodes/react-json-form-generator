import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

import type { Group, Field } from '@app-types/form-schema.type';

import { mockApi } from '@data/dev/mock-api';

import { evaluateVisibility } from '../utils';

interface UseAutoFillProps {
    schema: Group;
    formValues: Record<string, unknown>;
    onChange: (id: string, value: unknown) => void;
}

const useAutoFill = ({ schema, formValues, onChange }: UseAutoFillProps) => {
    // We are going to keep track of the last payload for each field to
    // avoid making redundant API calls when the same inputs are present
    const lastPayloadRef = useRef<Record<string, string>>({});
    const [loadingFields, setLoadingFields] = useState<Record<string, boolean>>({});

    const debouncedApiCall = useRef(
        debounce(async (field: Field, payload: Record<string, unknown>) => {
            //@ts-expect-error - We need to assert the type of mockApi to access dynamic keys
            const apiFn = mockApi[field.autoFill!.api];
            if (!apiFn) {
                return;
            }

            field.autoFill!.targetFields.forEach((targetId) => {
                setLoadingFields((prev) => ({ ...prev, [targetId]: true }));
            });

            try {
                const result = await apiFn(payload);

                field.autoFill!.targetFields.forEach((targetId) => {
                    onChange(targetId, result[targetId]);
                });
            } catch (err) {
                console.error(`Auto-fill failed for ${field.id}`, err);
            } finally {
                field.autoFill!.targetFields.forEach((targetId) => {
                    setLoadingFields((prev) => ({ ...prev, [targetId]: false }));
                });
            }
        }, 100)
    ).current;

    const processField = (field: Field) => {
        if (!field.autoFill) {
            return;
        }

        const { inputFields } = field.autoFill;

        const allInputsPresent = inputFields.every((id) => formValues[id] !== undefined);

        if (!allInputsPresent) {
            return;
        }

        const payload = Object.fromEntries(inputFields.map((id) => [id, formValues[id]]));

        const payloadKey = JSON.stringify(payload);

        if (lastPayloadRef.current[field.id] === payloadKey) {
            return;
        }
        lastPayloadRef.current[field.id] = payloadKey;

        debouncedApiCall(field, payload);
    };

    const traverse = (node: Field | Group) => {
        if (!evaluateVisibility(node.visibilityCondition, formValues)) {
            return;
        }

        if (node.type === 'group' && Array.isArray(node.children)) {
            node.children.forEach(traverse);
        } else {
            processField(node as Field);
        }
    };

    useEffect(() => {
        traverse(schema);
        return () => debouncedApiCall.cancel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schema, formValues]);

    return {
        isLoading: (id: string) => loadingFields[id] === true,
    };
};

export default useAutoFill;
