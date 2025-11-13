import 'reflect-metadata';

// Polyfill para localStorage en Jest/Node environment
if (typeof window === 'undefined') {
  (global as any).localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
}

