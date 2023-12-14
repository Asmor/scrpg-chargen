import { Die } from "@/types/common";
import { Question, QuestionProps, QuestionType } from "../Question";

export interface DiceRollQuestion extends Question {
	dice: Die[];
}
export type DiceRollQuestionResults = number[];

interface DiceRollQuestionProps {
	title: string;
	dice: Die[];
}

export const getDiceRollQuestion = (props: DiceRollQuestionProps): DiceRollQuestion => {
	return {
		type: QuestionType.DICE_ROLL,
		dice: props.dice,
		title: props.title,
	};
};
