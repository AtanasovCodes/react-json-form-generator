import debounce from 'lodash.debounce';

import type { DebouncedFunc } from 'lodash';

interface AutoSaveOptions<T> {
    version: string;
    validate?: (data: unknown) => data is T;
    debounceMs?: number;
}

class AutoSaveService<T> {
    private version: string;
    private validate?: (data: unknown) => data is T;
    private debouncedSaveFn: DebouncedFunc<(key: string, data: T) => void>;

    constructor(options: AutoSaveOptions<T>) {
        this.version = options.version;
        this.validate = options.validate;

        const delay = options.debounceMs ?? 300;

        this.debouncedSaveFn = debounce((key: string, data: T) => this.performSave(key, data), delay);
    }

    private performSave(key: string, data: T): void {
        try {
            const payload = {
                version: this.version,
                timestamp: Date.now(),
                data,
            };

            localStorage.setItem(key, JSON.stringify(payload));
        } catch (err) {
            console.error('AutoSave failed:', err);
        }
    }

    public save(key: string, data: T): void {
        this.debouncedSaveFn(key, data);
    }

    public load<R = T>(key: string): R | null {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return null;

            const parsed = JSON.parse(raw);

            if (parsed.version !== this.version) {
                console.warn('AutoSave version mismatch — ignoring saved data');
                return null;
            }

            if (this.validate && !this.validate(parsed.data)) {
                console.warn('AutoSave validation failed — ignoring saved data');
                return null;
            }

            return parsed.data as R;
        } catch (err) {
            console.error('Failed to load AutoSave:', err);
            return null;
        }
    }

    public clear(key: string): void {
        localStorage.removeItem(key);
    }

    public cancel(): void {
        this.debouncedSaveFn.cancel();
    }
}

export default AutoSaveService;
