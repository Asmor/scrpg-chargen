import { Principle, PrincipleCategory } from "@/data/principles.types";
import { getNewDecision } from "../Decision";
import Question, { QuestionProps, QuestionType } from "../Question";
import principles, { getPrincipleById } from "@/data/principles";
import Character from "../Character";
import { ChooserOption } from "@/components/Chooser";
import { Entry } from "@/types/common";

const makeOption = <T extends Entry,>(value: T): ChooserOption<T> => ({
	title: value.name,
	subtitle: `pg. ${value.page}`,
	value,
});

const principleOptionsByCategory = principles.map(makeOption).reduce((acc, principleOption) => {
	acc[principleOption.value.category].push(principleOption);
	return acc;
}, {
	[PrincipleCategory.ESOTERIC]: [] as ChooserOption<Principle>[],
	[PrincipleCategory.EXPERTISE]: [] as ChooserOption<Principle>[],
	[PrincipleCategory.IDEALS]: [] as ChooserOption<Principle>[],
	[PrincipleCategory.IDENTITY]: [] as ChooserOption<Principle>[],
	[PrincipleCategory.RESPONSIBILITY]: [] as ChooserOption<Principle>[],
});

const getPrincipleOptions = (
	selected: Principle | undefined,
	category: PrincipleCategory,
	char: Character,
): ChooserOption<Principle>[] => {
	const principleOptions = [...principleOptionsByCategory[category]];

	const filteredPrincipleOptions = principleOptions.filter(
		principleOption => {
			const optionId = principleOption.value.id;

			if ( selected?.id === optionId ) {
				return true;
			}

			return char.aspects.principles.every(
				principle => principle.id !== optionId
			);
		}
	);

	return filteredPrincipleOptions;
};

export interface PrincipleQuestionProps extends QuestionProps {
	getPrincipleCategory: (char: Character) => PrincipleCategory;
}

export interface PrincipleQuestion extends Question {
	principle?: Principle;
	getPrincipleCategory: (char: Character) => PrincipleCategory;
	getOptions: (char: Character) => ChooserOption<Principle>[];
	set: (decisionIndex: number, principle: Principle) => void;
}

export const getPrincipleQuestion = (
	props: PrincipleQuestionProps,
	saved?: string,
): PrincipleQuestion => {
	const pq: PrincipleQuestion = {
		type: QuestionType.PRINCIPLE_CHOICE,
		title: props.title,
		principle: getPrincipleById(saved || ""),
		complete: !!saved,
		getPrincipleCategory: props.getPrincipleCategory,
		getOptions: function (char) {
			return getPrincipleOptions(
				this.principle,
				this.getPrincipleCategory(char),
				char,
			)
		},
		reset: function () {
			this.principle = undefined;
			this.complete = false;
		},
		set: function (decisionIndex, principle) {
			this.principle = principle;
			props.onUpdate(decisionIndex);
		},
		update: function (char) {
			if ( this.principle ) {
				char.aspects.principles.push(this.principle);
			}
			return this.principle?.id || "";
		},
	};

	return pq;
};
