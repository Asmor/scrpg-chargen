import { Die } from "@/types/common";
import { Question, QuestionType } from "../Question";
import { freezeArray, thawArray } from "@/util/util";
import { identity } from "lodash";

export interface DiceRollQuestion extends Question {
	dice: Die[];
}

interface DiceRollQuestionProps {
	title: string;
	dice: Die[];
}

export const getDiceRollQuestion = (props: DiceRollQuestionProps): DiceRollQuestion => {
	return {
		type: QuestionType.DICE_ROLL,
		dice: props.dice,
		title: props.title,
		freeze: freezeArray.bind(null, identity),
		thaw: thawArray.bind(null, (n) => Number.parseInt(n)),
	};
};
