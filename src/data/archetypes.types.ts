import { Assignable, Die, Entry, GrantsAbilities, Rollable } from "@/types/common";
import { PrincipleCategory } from "./principles.types";
import { PowerCategory, QualityCategory } from "./powersQualities.types";

interface OrderedAssignablePqs extends Assignable {
	max?: number;
	dice?: Die[];
}

export interface Archetype extends Entry, Rollable, GrantsAbilities {
	mandatoryPq?: (string | PowerCategory | QualityCategory)[];
	mandatoryMinimum?: number;
	mandatoryAbilities?: string[];
	orderedAssignablePqs: OrderedAssignablePqs[];
	principleCategory: PrincipleCategory;
	todo?: boolean;
	complex?: boolean;
	pickGreenAsYellow?: boolean;
	additionalHealthBasis?: (string | PowerCategory | QualityCategory)[];
}
