// src/services/api/client.ts

import fetch from "cross-fetch";
import { URL } from "node:url";
import { getApiConfig } from "./config";

interface ApiError {
	error: string;
}

interface FetchOptions {
	method: string;
	data?: unknown;
	headers?: Record<string, string>;
}

export const fetchWithAuth = async <T>(
	path: string,
	options: FetchOptions,
): Promise<T> => {
	const { host, token } = await getApiConfig();
	const url = new URL(path, host);
	const response = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			"User-Agent": "Raycast Extension: excalidraw-save",
			...options.headers,
		},
		method: options.method,
		body: options.data ? JSON.stringify(options.data) : undefined,
	});

	const data = await response.json();

	if (!response.ok) {
		const error = data as ApiError;
		throw new Error(error.error || `HTTP error! status: ${response.status}`);
	}

	return data as T;
};
