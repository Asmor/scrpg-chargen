import { Die } from "@/types/common";
import Question, { QuestionProps, QuestionType } from "../Question";
import Character from "../Character";

export interface DiceRollQuestionProps extends QuestionProps {
	getDice: (char: Character) => Die[];
}
export interface DiceRollQuestion extends Question {
	results: number[];
	getDice: (char: Character) => Die[];
	set: (decisionIndex: number, results: number[]) => void;
}

export const getDiceRollQuestion = (
	props: DiceRollQuestionProps,
	saved?: string
): DiceRollQuestion => {
	const results = thawDiceRuleQuestionResults(saved) || [];

	const drq: DiceRollQuestion = {
		type: QuestionType.DICE_ROLL,
		title: props.title,
		results,
		complete: !!results.length,
		getDice: props.getDice,
		reset: function () {
			this.results = [];
			this.complete = false;
		},
		set: function (decisionIndex, results) {
			this.results = results;
			this.complete = !!results.length;
			props.onUpdate(decisionIndex);
		},
		update: function (char) {
			char.rolls.background = this.results;
			return freezeDiceRuleQuestion(this, char);
		},
	};

	return drq;
}

const freezeDiceRuleQuestion = (drq: DiceRollQuestion, char: Character): string => {
	const diceString = drq.getDice(char).join(",");
	const resultsString = drq.results.join(",");

	return [diceString, resultsString].join("@");
};
const thawDiceRuleQuestionResults = (frozenResults?: string): number[] | undefined => {
	const thawed = frozenResults
		?.split("@")
		// we only care about the results, which should be after the @ sign
		?.[1]
		?.split?.(",")
		?.map(numString => Number.parseInt(numString));

	if (thawed?.length) {
		return thawed;
	}
};

