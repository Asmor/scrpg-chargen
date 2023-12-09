import { Assignable, Die, Entry, Rollable } from "@/types/common";

interface ExtraAssignables extends Assignable {
	dice: Die[];
	// indicates that the choice must not be in the power source's normal list,
	// e.g. see Supernatural on page 65
	exclusive?: boolean;
}

export interface PowerSource extends Entry, Rollable, Assignable {
	archetypeDice: Die[];
	extraArchetypeDice?: Die[];
	abilities: string[];
	extraAssignables?: ExtraAssignables;
	yellowPicks: number;
	greenPicks?: number;
}
