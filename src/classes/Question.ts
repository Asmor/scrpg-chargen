import { getBackgroundById } from "@/data/backgrounds";
import { BgChoiceQuestion, BgChoiceQuestionProps, DiceRollQuestion, DiceRollQuestionProps, QuestionType } from "./Question.types";
import Character from "./Character.types";

export const getDiceRollQuestion = (
	props: DiceRollQuestionProps,
	saved?: string
): DiceRollQuestion => {
	const results = thawDiceRuleQuestionResults(saved) || [];

	const drq: DiceRollQuestion = {
		type: QuestionType.DICE_ROLL,
		title: props.title,
		dice: props.dice,
		results,
		complete: !!results.length,
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
			return freezeDiceRuleQuestion(this);
		},
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

export const getBackgroundChoiceQuestion = (
	props: BgChoiceQuestionProps,
	saved?: string
): BgChoiceQuestion => {
	const choice = getBackgroundById(saved || "");
	const bcq: BgChoiceQuestion = {
		type: QuestionType.BACKGROUND_CHOICE,
		title: props.title,
		complete: !!saved,
		getRolls: (char: Character) => char.rolls.background,
		choice: choice,
		reset: function () {
			this.choice = undefined;
			this.complete = false;
		},
		set: function (decisionIndex, bg) {
			this.choice = bg;
			this.complete = true;
			props.onUpdate(decisionIndex);
		},
		update: function (char) {
			char.aspects.background = choice;
			return this.choice?.id || "";
		},
	};

	return bcq;
};
