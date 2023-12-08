import { Die, Entry, Rollable } from "../types/common";
import { PrincipleCategory } from "./principles.types";

export interface Background extends Entry, Rollable {
	assignableDice: Die[];
	assignable: string[];
	principleCategory: PrincipleCategory;
	dice: Die[];
};
