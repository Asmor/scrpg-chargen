export interface PowerQuality {
	id: string;
	type: PowerQualityType;
	category: PowerCategory | QualityCategory;
	page: number;
	name: string;
}

export enum PowerQualityType {
	POWER = "Power",
	QUALITY = "Quality",
}

export enum PowerCategory {
	ATHLETIC = "ATHLETIC",
	ELEMENTAL_ENERGY = "ELEMENTAL_ENERGY",
	HALLMARK = "HALLMARK",
	INTELLECTUAL = "INTELLECTUAL",
	MATERIALS = "MATERIALS",
	MOBILITY = "MOBILITY",
	PSYCHIC = "PSYCHIC",
	SELF_CONTROL = "SELF_CONTROL",
	TECHNOLOGICAL = "TECHNOLOGICAL",
}

export enum QualityCategory {
	INFORMATION = "INFORMATION",
	MENTAL = "MENTAL",
	PHYSICAL = "PHYSICAL",
	SOCIAL = "SOCIAL",
	ROLEPLAYING = "ROLEPLAYING",
}
