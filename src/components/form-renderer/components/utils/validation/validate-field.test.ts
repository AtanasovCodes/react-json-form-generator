import { describe, it, expect } from 'vitest';

import { validateField } from './index';

describe.only('validateField', () => {
    it('returns an error message for a required field with an empty value', () => {
        const validationRules = [{ type: 'required', message: 'This field is required.' }];

        const error = validateField('', validationRules, {});
        expect(error).toBe('This field is required.');
    });

    it('returns null for a required field with a non-empty value', () => {
        const validationRules = [{ type: 'required', message: 'This field is required.' }];

        const error = validateField('Some value', validationRules, {});
        expect(error).toBeNull();
    });

    it('returns null for a required field with a value of 0', () => {
        const validationRules = [{ type: 'required', message: 'This field is required.' }];

        const error = validateField(0, validationRules, {});
        expect(error).toBeNull();
    });

    it('returns null for a required field with a boolean value', () => {
        const validationRules = [{ type: 'required', message: 'This field is required.' }];

        const error = validateField(true, validationRules, {});
        expect(error).toBeNull();
    });

    it('returns null for a required field with a non-empty array', () => {
        const validationRules = [{ type: 'required', message: 'This field is required.' }];

        const error = validateField([1, 2, 3], validationRules, {});
        expect(error).toBeNull();
    });

    it('returns an error message for a required field with an empty array', () => {
        const validationRules = [{ type: 'required', message: 'This field is required.' }];

        const error = validateField([], validationRules, {});
        expect(error).toBe('This field is required.');
    });

    it('returns an error message for a required field with null value', () => {
        const validationRules = [{ type: 'required', message: 'This field is required.' }];

        const error = validateField(null, validationRules, {});
        expect(error).toBe('This field is required.');
    });

    it('returns an error message for a required field with undefined value', () => {
        const validationRules = [{ type: 'required', message: 'This field is required.' }];

        const error = validateField(undefined, validationRules, {});
        expect(error).toBe('This field is required.');
    });
});
