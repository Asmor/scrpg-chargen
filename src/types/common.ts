export type Die = 4 | 6 | 8 | 10 | 12;

export enum Source {
	CORE = "CORE",
}

export interface Entry {
	id: string;
	name: string;
	source: Source;
	page: number;
};

// Things which can be rolled for
export interface Rollable {
	roll: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
}
