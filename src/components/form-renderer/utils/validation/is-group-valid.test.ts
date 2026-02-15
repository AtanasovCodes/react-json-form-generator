import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { Group } from '../../../../types/form-schema.type';

import isGroupValid from './is-group-valid.utils';

describe('isGroupValid', () => {
    const mockValidate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns true when group has no children', () => {
        const group: Group = {
            id: 'root',
            type: 'group',
            children: [],
        };

        const result = isGroupValid(group, {}, mockValidate);
        expect(result).toBe(true);
        expect(mockValidate).not.toHaveBeenCalled();
    });

    it('returns true when no fields have validation rules', () => {
        const group: Group = {
            id: 'root',
            type: 'group',
            children: [
                { id: 'a', type: 'text' },
                { id: 'b', type: 'number' },
            ],
        };

        const result = isGroupValid(group, {}, mockValidate);
        expect(result).toBe(true);
        expect(mockValidate).not.toHaveBeenCalled();
    });

    it('returns false when a field validator returns an error', () => {
        mockValidate.mockReturnValueOnce('error');

        const group: Group = {
            id: 'root',
            type: 'group',
            children: [
                {
                    id: 'a',
                    type: 'text',
                    validationRules: [{ type: 'required', message: 'Required' }],
                },
            ],
        };

        const result = isGroupValid(group, { a: '' }, mockValidate);
        expect(result).toBe(false);
        expect(mockValidate).toHaveBeenCalledTimes(1);
    });

    it('returns true when all fields pass validation', () => {
        mockValidate.mockReturnValue(null);

        const group: Group = {
            id: 'root',
            type: 'group',
            children: [
                {
                    id: 'a',
                    type: 'text',
                    validationRules: [{ type: 'required', message: 'Required' }],
                },
            ],
        };

        const result = isGroupValid(group, { a: 'hello' }, mockValidate);
        expect(result).toBe(true);
    });

    it('validates nested groups recursively', () => {
        mockValidate.mockReturnValueOnce('error');

        const group: Group = {
            id: 'root',
            type: 'group',
            children: [
                {
                    id: 'nested',
                    type: 'group',
                    children: [
                        {
                            id: 'a',
                            type: 'text',
                            validationRules: [{ type: 'required', message: 'Required' }],
                        },
                    ],
                },
            ],
        };

        const result = isGroupValid(group, { a: '' }, mockValidate);
        expect(result).toBe(false);
        expect(mockValidate).toHaveBeenCalledTimes(1);
    });
});
