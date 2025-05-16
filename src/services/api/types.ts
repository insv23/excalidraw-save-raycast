// src/services/api/types.ts

export interface CreateLinkRequestData {
	url: string;
	description: string;
}

export interface UpdateLinkRequestData {
	url?: string;
	description?: string;
	pinned?: boolean;
	archived?: boolean;
}
