import { Die } from "@/types/common";
import Character from "./Character.types";
import { Background } from "@/data/backgrounds.types";
import { DecisionUpdate } from "./Decision.types";

export enum QuestionType {
	DICE_ROLL = "DICE_ROLL",
	BACKGROUND_CHOICE = "BACKGROUND_CHOICE",
}

interface QuestionProps {
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

export interface DiceRollQuestionProps extends QuestionProps {
	dice: Die[];
}
export interface DiceRollQuestion extends Question {
	type: QuestionType.DICE_ROLL;
	dice: Die[];
	results: number[];
	set: (decisionIndex: number, results: number[]) => void;
}

export interface BgChoiceQuestionProps extends QuestionProps {
}
export interface BgChoiceQuestion extends Question {
	type: QuestionType.BACKGROUND_CHOICE;
	getRolls: (char: Character) => number[];
	choice?: Background;
	set: (decisionIndex: number, bg: Background) => void;
}
