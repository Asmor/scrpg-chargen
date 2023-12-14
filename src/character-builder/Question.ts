export interface Question {
	type: QuestionType;
	title: string;
}

export enum QuestionType {
	DICE_ROLL = "DICE_ROLL",
	BACKGROUND_CHOICE = "BACKGROUND_CHOICE",
	POWER_QUALITY_CHOICE = "POWER_QUALITY_CHOICE",
	PRINCIPLE_CHOICE = "PRINCIPLE_CHOICE",
}

export interface Results {};
