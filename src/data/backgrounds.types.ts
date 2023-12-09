import { Assignable, Die, Entry, Rollable } from "../types/common";
import { PrincipleCategory } from "./principles.types";

export interface Background extends Entry, Rollable, Assignable {
	principleCategory: PrincipleCategory;
	powerSourceDice: Die[];
};
