/**
 * @file async.ts
 * Utility async helpers to simplify error handling in async/await patterns, with custom logging.
 * Recommended to choose one of the exported functions for each use case.
 */

/**
 * Result tuple for safeAwait.
 * @template T - Type of the resolved data.
 */
export type SafeAwaitResult<T> = [Error | null, T | null];

/**
 * Unified result object for resultOrError and tryCatchWrapper.
 * @template T - Type of the resolved data.
 */
export interface ResultOrError<T> {
	/** Indicates if the operation succeeded. */
	success: boolean;
	/** The data if successful, otherwise null. */
	data: T | null;
	/** The error if failed, otherwise null. */
	error: Error | null;
}

/**
 * Configuration options for async utilities.
 */
export interface AsyncUtilsOptions {
	/** Enable or disable console logging. Default: true */
	log?: boolean;
	/** Optional label to tag logs. Pattern: [TIMESTAMP] [LEVEL] [LOGGER_NAME] [THREAD_ID] - MESSAGE [EXCEPTION_DETAILS] */
	label?: string;
}

/**
 * Internal logger that logs errors to console.
 * @param error - The error to log.
 * @param options - Logging options.
 */
function logError(error: unknown, options?: AsyncUtilsOptions): void {
	if (options?.log !== false) {
		const labelPrefix = options?.label ? `[${options.label}] - Async Error ` : "";
		console.error(labelPrefix, error);
	}
}

/**
 * Handles a promise and returns a tuple of [error, data].
 * Logs errors to console based on options.
 *
 * @template T - Type of the resolved data.
 * @param promise - The promise to await.
 * @param opt - Optional logging configuration.
 * @returns A tuple [Error | null, T | null].
 *
 * @example
 * const [err, data] = await safeAwait(fetchData(), { label: 'Fetch' });
 */
export async function safeAwait<T>(promise: Promise<T>, opt?: AsyncUtilsOptions): Promise<SafeAwaitResult<T>> {
	try {
		const data = await promise;
		return [null, data];
	} catch (error) {
		logError(error, opt);
		return [error as Error, null];
	}
}

/**
 * Awaits a promise and returns an object with success, data, and error.
 * Logs errors to console based on options.
 *
 * @template T - Type of the resolved data.
 * @param promise - The promise to await.
 * @param opt - Optional logging configuration.
 * @returns An object { success, data, error }.
 *
 * @example
 * const result = await resultOrError(fetchData(), { log: false });
 */
export async function resultOrError<T>(promise: Promise<T>, opt?: AsyncUtilsOptions): Promise<ResultOrError<T>> {
	try {
		const data = await promise;
		return { success: true, data, error: null };
	} catch (error) {
		logError(error, opt);
		return { success: false, data: null, error: error as Error };
	}
}

/**
 * Wraps an async function and returns a new function that
 * returns a ResultOrError<T> object instead of throwing.
 * Errors are automatically logged based on globalOptions.
 *
 * @template T - Return type of the original function.
 * @template Args - Argument types of the original function.
 * @param fn - The async function to wrap.
 * @param opt - Default logging configuration.
 * @returns A new async function that returns ResultOrError<T>.
 *
 * @example
 * const safeFetch = tryCatchWrapper(fetchData, { log: false });
 * const result = await safeFetch(url);
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tryCatchWrapper<Args extends any[], T>(
	fn: (...args: Args) => Promise<T>,
	opt?: AsyncUtilsOptions
): (...args: Args) => Promise<ResultOrError<T>> {
	return async (...args: Args): Promise<ResultOrError<T>> => {
		try {
			const data = await fn(...args);
			return { success: true, data, error: null };
		} catch (error) {
			logError(error, opt);
			return { success: false, data: null, error: error as Error };
		}
	};
}
