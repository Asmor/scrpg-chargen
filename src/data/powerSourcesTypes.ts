import { Assignable, Die, Entry, GrantsAbilities, Rollable } from "@/types/common";

interface ExtraAssignables extends Assignable {
	dice: Die[];
	// indicates that the choice must not be in the power source's normal list,
	// e.g. see Supernatural on page 65
	exclusive?: boolean;
}

export interface PowerSource extends Entry, Rollable, Assignable, GrantsAbilities {
	archetypeDice: Die[];
	extraArchetypeDice?: Die[];
	extraAssignables?: ExtraAssignables;
}
