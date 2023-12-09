import { Assignable, Die, Entry, Rollable } from "@/types/common";

export interface PowerSource extends Entry, Rollable, Assignable {
	archetypeDice: Die[];
	abilities: string[];
}
