import { describe, it, expect } from 'vitest';

import { validateField } from './index';

describe('validateField', () => {
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

    it('return an error message for a field that does not meet minLength requirement', () => {
        const validationRules = [{ type: 'minLength', value: 5, message: 'Minimum length is 5.' }];

        const error = validateField('abc', validationRules, {});
        expect(error).toBe('Minimum length is 5.');
    });

    it('returns null for a field that meets minLength requirement', () => {
        const validationRules = [{ type: 'minLength', value: 5, message: 'Minimum length is 5.' }];

        const error = validateField('abcde', validationRules, {});
        expect(error).toBeNull();
    });

    it('returns an error message for a field that exceeds maxLength requirement', () => {
        const validationRules = [{ type: 'maxLength', value: 5, message: 'Maximum length is 5.' }];

        const error = validateField('abcdef', validationRules, {});
        expect(error).toBe('Maximum length is 5.');
    });

    it('returns null for a field that meets maxLength requirement', () => {
        const validationRules = [{ type: 'maxLength', value: 5, message: 'Maximum length is 5.' }];

        const error = validateField('abcde', validationRules, {});
        expect(error).toBeNull();
    });

    it('returns an error message for a field that does not match the pattern', () => {
        const validationRules = [{ type: 'pattern', value: '^[0-9]+$', message: 'Must be a numeric value.' }];

        const error = validateField('abc123', validationRules, {});
        expect(error).toBe('Must be a numeric value.');
    });

    it('returns null for a field that matches the pattern', () => {
        const validationRules = [{ type: 'pattern', value: '^[0-9]+$', message: 'Must be a numeric value.' }];

        const error = validateField('123456', validationRules, {});
        expect(error).toBeNull();
    });

    it('handle pattern validation when rule.value is a RegExp', () => {
        const validationRules = [{ type: 'pattern', value: /^[0-9]+$/, message: 'Must be a numeric value.' }];

        const error = validateField('abc123', validationRules, {});
        expect(error).toBe('Must be a numeric value.');
    });

    it('throws an error for invalid pattern value', () => {
        const validationRules = [{ type: 'pattern', value: 123, message: 'Invalid pattern.' }];

        expect(() => validateField('test', validationRules, {})).toThrowError('Invalid pattern value for field: 123');
    });

    it('continues to next rule if dependsOn condition is not met', () => {
        const validationRules = [
            {
                type: 'required',
                message: 'This field is required.',
                dependsOn: { fieldId: 'otherField', value: 'specificValue' },
            },
            { type: 'minLength', value: 5, message: 'Minimum length is 5.' },
        ];

        const formValues = { otherField: 'differentValue' };

        const error = validateField('', validationRules, formValues);
        expect(error).toBe('Minimum length is 5.');
    });
});
