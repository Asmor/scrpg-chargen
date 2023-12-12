import { getBackgroundById } from "@/data/backgrounds";
import { Background } from "@/data/backgrounds.types";
import Question, { QuestionProps, QuestionType } from "../Question";
import Character from "../Character";

export interface BgChoiceQuestionProps extends QuestionProps {
}
export interface BgChoiceQuestion extends Question {
	getRolls: (char: Character) => number[];
	choice?: Background;
	set: (decisionIndex: number, bg: Background) => void;
}

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
			char.aspects.background = this.choice;
			return this.choice?.id || "";
		},
	};

	return bcq;
};
