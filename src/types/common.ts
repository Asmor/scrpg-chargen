import { PowerQualitySpecifier } from "@/data/powersQualities.types";

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

export const isEntry = (val: any): val is Entry => val?.id && val.name && val.source && val.page;

export interface Assignable {
	assignablePqs: (string | PowerQualitySpecifier)[],
}

// Things which can be rolled for
export interface Rollable {
	roll: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
}

export const isRollable = (val: any): val is Rollable => !!val.roll;

export interface GrantsAbilities {
	abilities: string[];
	yellowPicks?: number;
	greenPicks?: number;
	redPicks?: number;
	outPicks?: number;
}
