import { Character } from "./Character";

export interface Question {
	type: QuestionType;
	title: string;
	critical?: boolean;
	freeze: (value: any) => string;
	thaw: (frozenValue?: string) => any;
}

export interface QuestionProps {
	character: Character;
	// results: string;
}

export enum QuestionType {
	DICE_ROLL = "DICE_ROLL",

	BACKGROUND_CHOICE = "BACKGROUND_CHOICE",
	POWER_SOURCE_CHOICE = "POWER_SOURCE_CHOICE",
	PRINCIPLE_CHOICE = "PRINCIPLE_CHOICE",

	POWER_QUALITY_CHOICE = "POWER_QUALITY_CHOICE",
	ABILITY_SELECTION = "ABILITY_SELECTION",
}
