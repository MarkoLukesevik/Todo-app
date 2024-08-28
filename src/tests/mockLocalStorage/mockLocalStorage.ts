export interface MockLocalStorage {
    store: Record<string, string>;
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
}

export const mockLocalStorage: MockLocalStorage = {
    store: {},
    getItem(key: string) {
      return this.store[key] || null;
    },
    setItem(key: string, value: string) {
      this.store[key] = value;
    },
    removeItem(key: string) {
      delete this.store[key];
    },
    clear(): void {
        this.store = {};
    }
};