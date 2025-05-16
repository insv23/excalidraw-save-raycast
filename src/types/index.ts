// src/types/index.ts

export interface Preferences {
	host: string;
	token: string;
}

export interface Link {
	id: number;
	url: string;
	description: string;
	created_at: number;
	last_visited_at: number;
	pinned: number;
	archived: number;
}
