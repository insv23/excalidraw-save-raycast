// src/services/api/endpoints/links.ts

import { fetchWithAuth } from "../client";
import type { CreateLinkRequestData } from "../types";

export const createLink = async (
	data: CreateLinkRequestData,
): Promise<{ message: string }> => {
	return fetchWithAuth<{ message: string }>("/api/links", {
		method: "POST",
		data: data,
	});
};

