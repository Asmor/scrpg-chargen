import { Die, Entry, Rollable } from "@/types/common";

export interface PowerSource extends Entry, Rollable {
	archetypeDice: Die[];
}
