import { Die } from "@/types/common";
import Character from "./Character.types";

export enum QuestionType {
	DICE_ROLL,
}

export default interface Question {
	type: QuestionType;
	title: string;
	complete: boolean;
	// the string emitted by update is used to build a cache key. It should be
	// stable for small changes that don't warrant recalculation, and should
	// change when recalculation is required. The string must not contain pipes.
	update: (char: Character) => string;
	set: Function;
}

export interface DiceRollQuestionProps {
	dice: Die[];
	title: string;
}

export interface DiceRollQuestion extends Question {
	dice: Die[];
	results: number[];
	set: (results: number[]) => void;
}
