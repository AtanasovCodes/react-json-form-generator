import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { isGroupValid, schemaHasValidation } from '../utils/validation';

import useFormValidation from './use-form-validation';

vi.mock('../utils/validation', () => ({
    isGroupValid: vi.fn(),
    schemaHasValidation: vi.fn(),
    validateField: vi.fn(),
}));

vi.mock('lodash.debounce', () => ({
    default: (fn: any) => {
        fn.cancel = () => {};
        return fn;
    },
}));

const TestComponent = ({ schema, values, onResult }) => {
    const result = useFormValidation(schema, values);
    onResult(result);
    return null;
};

describe.only('useFormValidation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns true when schema has no validation', () => {
        (schemaHasValidation as any).mockReturnValue(false);

        let hookResult: any;

        render(
            <TestComponent
                schema={{ id: 'root', type: 'group', children: [] }}
                values={{}}
                onResult={(r) => (hookResult = r)}
            />
        );

        expect(hookResult.isValid).toBe(true);
    });

    it('returns false when validation fails', async () => {
        (schemaHasValidation as any).mockReturnValue(true);
        (isGroupValid as any).mockReturnValue(false);

        let hookResult: any;

        render(
            <TestComponent
                schema={{
                    id: 'root',
                    type: 'group',
                    children: [
                        {
                            id: 'a',
                            type: 'text',
                            validationRules: [{ type: 'required', message: 'Required' }],
                        },
                    ],
                }}
                values={{ a: '' }}
                onResult={(r) => (hookResult = r)}
            />
        );

        expect(hookResult.isValid).toBe(false);
    });
});
