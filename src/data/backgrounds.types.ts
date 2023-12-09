import { Die, Entry, Rollable } from "../types/common";
import { PowerCategory, PowerQualitySpecifier, QualityCategory } from "./powersQualities.types";
import { PrincipleCategory } from "./principles.types";

export interface Background extends Entry, Rollable {
	assignableDice: Die[];
	assignable: PowerQualitySpecifier[];
	principleCategory: PrincipleCategory;
	dice: Die[];
};
