import { Entry } from "@/types/common";
import { PowerCategory, PowerQuality, QualityCategory } from "./powersQualities.types";

export enum AbilityColor {
	GREEN = "GREEN",
	YELLOW = "YELLOW",
	RED = "RED",
	OUT = "OUT",
}

export enum AbilityIcon {
	NONE = "NONE", // todo: make into empty array
	MULTIPLE = "MULTIPLE", // todo: get actual icons
	UP = "UP",
	DOWN = "DOWN",
	SHIELD = "SHIELD",
	FIST = "FIST",
	HEALTH = "HEALTH",
	OVER = "OVER",
}

export enum AbilityType {
	ACTION = "ACTION",
	REACTION = "REACTION",
	INHERENT = "INHERENT",
	ACTION_INHERENT = "ACTION_INHERENT",
	NONE = "NONE",
}

export enum AbilityRestriction {
	ARCHETYPE = "ARCHETYPE",
}

export interface Ability extends Entry {
	association: string;
	color: AbilityColor;
	icons: AbilityIcon[];
	type: AbilityType;
	text: string;
	choice?: string[];
	powerQualitySpecifier?: (string | PowerCategory | QualityCategory)[],
	powerQualitySourceRestrction?: AbilityRestriction,
}

export interface AbilityConfiguration {
	chosenPq?: PowerQuality;
	chosenText?: string;
	name?: string;
}

export interface AbilityChoice {
	id: string;
	config: AbilityConfiguration;
}
