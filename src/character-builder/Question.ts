import { Character } from "./Character";

export interface Question {
	type: QuestionType;
	title: string;
}

export interface QuestionProps {
	character: Character;
	results: Results;
}

export enum QuestionType {
	DICE_ROLL = "DICE_ROLL",

	BACKGROUND_CHOICE = "BACKGROUND_CHOICE",
	POWER_SOURCE_CHOICE = "POWER_SOURCE_CHOICE",
	PRINCIPLE_CHOICE = "PRINCIPLE_CHOICE",

	POWER_QUALITY_CHOICE = "POWER_QUALITY_CHOICE",
}

export type Results = any;
