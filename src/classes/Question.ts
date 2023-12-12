import Character from "./Character";
import { DecisionUpdate } from "./Decision";

export enum QuestionType {
	DICE_ROLL = "DICE_ROLL",
	BACKGROUND_CHOICE = "BACKGROUND_CHOICE",
	POWER_QUALITY_CHOICE = "POWER_QUALITY_CHOICE",
	PRINCIPLE_CHOICE = "PRINCIPLE_CHOICE",
}

export interface QuestionProps {
	onUpdate: DecisionUpdate;
	title: string;
}

export default interface Question {
	type: QuestionType;
	title: string;
	complete: boolean;
	// the string emitted by update is used to build a cache key. It should be
	// stable for small changes that don't warrant recalculation, and should
	// change when recalculation is required. The string must not contain pipes.
	update: (char: Character) => string;
	set: (decisionIndex: number, ...rest: any[]) => void;
	reset: () => void;
}
