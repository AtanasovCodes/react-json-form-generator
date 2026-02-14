import { describe, it, expect, vi, beforeEach } from 'vitest';

import AutoSaveService from './auto-save.service';

interface TestSchema {
    foo: string;
}

describe.only('AutoSaveService (with mocked localStorage)', () => {
    let service: AutoSaveService<TestSchema>;
    let store: Record<string, string>;

    beforeEach(() => {
        vi.useFakeTimers();

        store = {};

        // We are going to mock localStorage methods to interact with our in-memory `store` object
        vi.stubGlobal('localStorage', {
            getItem: vi.fn((key: string) => store[key] ?? null),
            setItem: vi.fn((key: string, value: string) => {
                store[key] = value;
            }),
            removeItem: vi.fn((key: string) => {
                delete store[key];
            }),
            clear: vi.fn(() => {
                store = {};
            }),
        });

        service = new AutoSaveService<TestSchema>({
            version: '1',
            debounceMs: 300,
        });
    });

    it('saves correct payload structure', () => {
        service.save('test', { foo: 'hello' });

        vi.advanceTimersByTime(300);

        const raw = store['test'];
        expect(raw).toBeDefined();

        const parsed = JSON.parse(raw);

        expect(parsed).toHaveProperty('version', '1');
        expect(parsed).toHaveProperty('timestamp');
        expect(parsed).toHaveProperty('data');
        expect(parsed.data.foo).toBe('hello');
    });

    it('loads saved data when version matches', () => {
        store['test'] = JSON.stringify({
            version: '1',
            timestamp: Date.now(),
            data: { foo: 'bar' },
        });

        const result = service.load('test');
        expect(result).toEqual({ foo: 'bar' });
    });

    it('returns null when version mismatches', () => {
        store['test'] = JSON.stringify({
            version: '999',
            timestamp: Date.now(),
            data: { foo: 'bar' },
        });

        const result = service.load('test');
        expect(result).toBeNull();
    });

    it('returns null when validation fails', () => {
        const validatingService = new AutoSaveService<TestSchema>({
            version: '1',
            debounceMs: 300,
            //@ts-expect-error - we want to test validation failure
            validate: (data): data is TestSchema => typeof (data as unknown)?.foo === 'string',
        });

        store['test'] = JSON.stringify({
            version: '1',
            timestamp: Date.now(),
            data: { foo: 123 }, // invalid
        });

        const result = validatingService.load('test');
        expect(result).toBeNull();
    });

    it('clears saved data', () => {
        store['test'] = '123';

        service.clear('test');

        expect(store['test']).toBeUndefined();
        expect(localStorage.removeItem).toHaveBeenCalledWith('test');
    });
});
