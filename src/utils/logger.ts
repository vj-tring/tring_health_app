/* Simple logger wrapper so you can centralise logging later if needed */

// eslint-disable-next-line no-console
export const log = (...args: unknown[]) => console.log('[LOG]', ...args);

// eslint-disable-next-line no-console
export const logError = (...args: unknown[]) => console.error('[ERROR]', ...args);

