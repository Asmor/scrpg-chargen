import { Entry } from "@/types/common";

export interface PowerQuality extends Entry {
	type: PowerQualityType;
	category: PowerCategory | QualityCategory;
}

export enum PowerQualityType {
	POWER = "Power",
	QUALITY = "Quality",
}

export enum PowerCategory {
	ALL = "AllPowers",
	ATHLETIC = "Athletic",
	ELEMENTAL_ENERGY = "Elemental Energy",
	HALLMARK = "Hallmark",
	INTELLECTUAL = "Intellectual",
	MATERIALS = "Materials",
	MOBILITY = "Mobility",
	PSYCHIC = "Psychic",
	SELF_CONTROL = "Self-Control",
	TECHNOLOGICAL = "Technological",
}

export enum QualityCategory {
	ALL = "AllQualities",
	INFORMATION = "Information",
	MENTAL = "Mental",
	PHYSICAL = "Physical",
	SOCIAL = "Social",
	ROLEPLAYING = "Roleplaying",
}

export type PowerQualitySpecifier = PowerCategory | QualityCategory;
