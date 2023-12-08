export type Die = 4 | 6 | 8 | 10 | 12;

export enum PrincipleCategory {
	ESOTERIC = "Esoteric",
	EXPERTISE = "Expertise",
	IDEALS = "Ideals",
	IDENTITY = "Identity",
	RESPONSIBILITY = "Responsibility",
}

export interface Background {
	name: string;
	page: number;
	roll: number;
	assignableDice: Die[];
	assignable: string[];
	principleCategory: PrincipleCategory;
	dice: Die[];
};
