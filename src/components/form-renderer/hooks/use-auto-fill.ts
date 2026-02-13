import debounce from 'lodash.debounce';
import { useEffect, useRef } from 'react';

import type { Field, Group } from '../../../types/form-schema.type';

import { mockApi } from '../../../data/dev/mock-api';
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

    const debouncedApiCall = useRef(
        debounce(
            async (
                field: Field,
                payload: Record<string, unknown>,
                onChangeFn: (id: string, value: unknown) => void
            ) => {
                //@ts-expect-error - We need to assert the type of mockApi to access dynamic keys
                const apiFn = mockApi[field.autoFill!.api];
                if (!apiFn) {
                    return;
                }
                const result = await apiFn(payload);

                field.autoFill!.targetFields.forEach((targetId) => {
                    onChangeFn(targetId, result[targetId]);
                });
            },
            400
        )
    ).current;

    useEffect(() => {
        const processField = async (field: Field | Group) => {
            if (!field.autoFill) return;

            const { inputFields } = field.autoFill;

            const allInputsPresent = inputFields.every((id) => formValues[id]);
            if (!allInputsPresent) return;

            const payload = inputFields.reduce((acc, id) => {
                acc[id] = formValues[id];
                return acc;
            }, {});

            const payloadKey = JSON.stringify(payload);
            if (lastPayloadRef.current[field.id] === payloadKey) {
                return;
            }
            lastPayloadRef.current[field.id] = payloadKey;

            debouncedApiCall(field as Field, payload, onChange);
        };

        const traverse = (node: Field | Group) => {
            if (!evaluateVisibility(node.visibilityCondition, formValues)) {
                return;
            }

            if (node.type === 'group') {
                node.children.forEach(traverse);
            } else {
                processField(node as Field);
            }
        };

        traverse(schema);
        return () => {
            debouncedApiCall.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schema, formValues, onChange]);
};

export default useAutoFill;
