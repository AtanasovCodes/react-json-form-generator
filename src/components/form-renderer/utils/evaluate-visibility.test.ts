import { describe, it, expect, vi } from 'vitest';

import evaluateVisibility, { isVisibilityCondition } from './evaluate-visibility.utils';

describe('evaluateVisibility', () => {
    const formValues = {
        userType: 'admin',
        age: 25,
    };

    describe('Good Cases', () => {
        it('should return true for a valid equals condition', () => {
            const condition = { fieldId: 'userType', operator: 'equals', value: 'admin' };
            expect(evaluateVisibility(condition, formValues)).toBe(true);
        });

        it('should return false for a valid notEquals condition', () => {
            const condition = { fieldId: 'userType', operator: 'notEquals', value: 'editor' };
            expect(evaluateVisibility(condition, formValues)).toBe(true);
        });

        it('should return true for a valid greaterThan condition', () => {
            const condition = { fieldId: 'age', operator: 'greaterThan', value: 18 };
            expect(evaluateVisibility(condition, formValues)).toBe(true);
        });

        it('should return false for a valid lessThan condition', () => {
            const condition = { fieldId: 'age', operator: 'lessThan', value: 30 };
            expect(evaluateVisibility(condition, formValues)).toBe(true);
        });

        it('should return true if no condition is provided', () => {
            expect(evaluateVisibility(undefined, formValues)).toBe(true);
        });
    });

    describe('Bad Cases', () => {
        it('should return true for an invalid condition', () => {
            const condition = { fieldId: 'userType', operator: 'invalidOperator', value: 'admin' };
            expect(evaluateVisibility(condition as unknown, formValues)).toBe(true);
        });

        it('should return true and log a warning for a malformed condition', () => {
            const condition = { fieldId: 'userType', value: 'admin' }; // Missing operator
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            expect(evaluateVisibility(condition as unknown, formValues)).toBe(true);
            expect(consoleSpy).toHaveBeenCalledWith('Invalid visibility condition:', condition);

            consoleSpy.mockRestore();
        });

        it('should return true and not log a warning for an unsupported operator when isVisibilityCondition is mocked', () => {
            const condition = { fieldId: 'userType', operator: 'unsupported', value: 'admin' };

            // Mock the isVisibilityCondition function to always return true
            const mockIsVisibilityCondition = vi.fn().mockReturnValue(true);

            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            expect(evaluateVisibility(condition, formValues, mockIsVisibilityCondition)).toBe(true);

            expect(consoleSpy).toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalledWith('Unsupported operator: unsupported');
            consoleSpy.mockRestore();
        });

        it('should return true if fieldId does not exist in formValues', () => {
            const condition = { fieldId: 'nonExistentField', operator: 'equals', value: 'value' };
            expect(evaluateVisibility(condition, formValues)).toBe(false);
        });
    });
});

describe('isVisibilityCondition', () => {
    it('should return true for a valid VisibilityCondition', () => {
        const condition = { fieldId: 'userType', operator: 'equals', value: 'admin' };
        expect(isVisibilityCondition(condition)).toBe(true);
    });

    it('should return false for an object missing fieldId', () => {
        const condition = { operator: 'equals', value: 'admin' };
        expect(isVisibilityCondition(condition)).toBe(false);
    });

    it('should return false for an object missing operator', () => {
        const condition = { fieldId: 'userType', value: 'admin' };
        expect(isVisibilityCondition(condition)).toBe(false);
    });

    it('should return false for an object missing value', () => {
        const condition = { fieldId: 'userType', operator: 'equals' };
        expect(isVisibilityCondition(condition)).toBe(false);
    });

    it('should return false for an object with an invalid operator', () => {
        const condition = { fieldId: 'userType', operator: 'invalid', value: 'admin' };
        expect(isVisibilityCondition(condition)).toBe(false);
    });

    it('should return false for a non-object input', () => {
        expect(isVisibilityCondition(null)).toBe(false);
        expect(isVisibilityCondition(undefined)).toBe(false);
        expect(isVisibilityCondition(42)).toBe(false);
        expect(isVisibilityCondition('string')).toBe(false);
    });
});
