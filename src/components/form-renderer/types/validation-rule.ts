export interface ValidationRule {
    type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
    value?: string | number | RegExp;
    message: string;
    dependsOn?: {
        fieldId: string;
        value: unknown;
    };
}
