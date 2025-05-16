// src/services/api/endpoints/links.ts

import { fetchWithAuth } from "../client";
import type { Link } from "../../../types";
import type { CreateLinkRequestData, UpdateLinkRequestData } from "../types";

export const createLink = async (
	data: CreateLinkRequestData,
): Promise<{ message: string }> => {
	return fetchWithAuth<{ message: string }>("/api/links", {
		method: "POST",
		data: data,
	});
};

export const getLinks = async (): Promise<Link[]> => {
	return fetchWithAuth<Link[]>("/api/links", { method: "GET" });
};

export const recordVisit = async (id: number): Promise<{ message: string }> => {
	return fetchWithAuth<{ message: string }>(`/api/links/${id}/visit`, {
		method: "POST",
	});
};

export const updateLink = async (
	id: number,
	data: UpdateLinkRequestData
): Promise<{ message: string }> => {
	return fetchWithAuth<{ message: string }>(`/api/links/${id}`, {
		method: "PATCH",
		data: data,
	});
};
