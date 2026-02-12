/**
 * Defines a condition for dynamically showing or hiding a field or group
 * based on the value of another field.
 */
export type VisibilityCondition = {
    /**
     * The ID of the field whose value will be evaluated.
     */
    fieldId: string;

    /**
     * The operator to use for comparison.
     * - `equals`: Checks if the field value is equal to the specified value.
     * - `notEquals`: Checks if the field value is not equal to the specified value.
     * - `greaterThan`: Checks if the field value is greater than the specified value (numbers only).
     * - `lessThan`: Checks if the field value is less than the specified value (numbers only).
     */
    operator: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan';

    /**
     * The value to compare the field value against.
     */
    value: unknown;
};

