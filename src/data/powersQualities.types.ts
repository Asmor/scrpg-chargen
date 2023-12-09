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
	INFORMATION = "Information",
	MENTAL = "Mental",
	PHYSICAL = "Physical",
	SOCIAL = "Social",
	ROLEPLAYING = "Roleplaying",
}

export type PowerQualitySpecifier = string | PowerCategory | QualityCategory;
