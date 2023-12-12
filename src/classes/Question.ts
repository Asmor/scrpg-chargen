import { DiceRollQuestion, DiceRollQuestionProps, QuestionType } from "./Question.types";

export const getDiceRollQuestion = (
	props: DiceRollQuestionProps,
	saved?: string
): DiceRollQuestion => {
	const results = thawDiceRuleQuestionResults(saved) || [];

	const drq: DiceRollQuestion = {
		type: QuestionType.DICE_ROLL,
		title: props.title,
		update: function (char) {
			char.rolls.background = this.results;
			return freezeDiceRuleQuestion(this);
		},
		set: function (results) {
			this.results = results;
			this.complete = !!results.length;
		},
		dice: props.dice,
		results,
		complete: !!results.length,
	};

	return drq;
}

const freezeDiceRuleQuestion = (drq: DiceRollQuestion): string => {
	const diceString = drq.dice.join(",");
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

	if ( thawed?.length ) {
		return thawed;
	}
};
