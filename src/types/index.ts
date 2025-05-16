// src/types/index.ts

export interface Preferences {
	host: string;
	token: string;
}

export interface Link {
	id: string;
	url: string;
	description: string;
	created_at: string;
	last_visited_at: string;
	pinned: number;
	archived: number;
}
