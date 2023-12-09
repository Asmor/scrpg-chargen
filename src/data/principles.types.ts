import { Entry } from "../types/common";

export enum PrincipleCategory {
	ESOTERIC = "Esoteric",
	EXPERTISE = "Expertise",
	IDEALS = "Ideals",
	IDENTITY = "Identity",
	RESPONSIBILITY = "Responsibility",
}

export interface Principle extends Entry {
	category: PrincipleCategory;
	abilityId: string;
}
