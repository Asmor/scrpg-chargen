import { Ability, AbilityChoice } from "@/data/abilities.types";
import { Question, QuestionProps, QuestionType } from "../Question";
import { getAbilityById } from "@/data/abilities";
import { identity } from "lodash";
import { getPowerQualityById } from "@/data/powersQualities";
import { AbilityChooserColorDetails } from "@/components/forms/AbilityChooser";

export interface AbilityQuestion extends Question {
	greenPicks: number;
	yellowPicks: number;
	redPicks: number;
	availableAbilities: Ability[];
	usedAbilities: Ability[];
	availablePqSpecifiers: string[];
	colors: AbilityChooserColorDetails[];
}

interface AbilityQuestionProps extends QuestionProps {
	title: string;
	greenPicks: number;
	yellowPicks: number;
	redPicks: number;
	availableIds: string[];
	usedIds?: string[];
	availablePqSpecifiers: string[];
	colors: AbilityChooserColorDetails[];
}

const getAbilitiesById = (ids: string[]) => ids.map((id) => getAbilityById(id))
	.filter(identity) as Ability[];

const HASH_PLACEHOLDER = "@@HASH@@";
const COLON_PLACEHOLDER = "@@COLON@@";
const PIPE_PLACEHOLDER = "@@PIPE@@";

const separators = [
	{ char: "#", escape: "@@HASH@@" },
	{ char: ":", escape: "@@COLOR@@" },
	{ char: "|", escape: "@@PIPE@@" },
];

const sanitize = (original: string = "") => separators.reduce(
	(s, {char, escape}) => s.replaceAll(char, escape),
	original
);

const desanitize = (original: string = "") => separators.reduce(
	(s, {char, escape}) => s.replaceAll(escape, char),
	original
);


export const getAbilityQuestion = (
	props: AbilityQuestionProps
): AbilityQuestion => {
	return {
		type: QuestionType.ABILITY_SELECTION,
		title: props.title,
		greenPicks: props.greenPicks,
		yellowPicks: props.yellowPicks,
		redPicks: props.redPicks,
		availableAbilities: getAbilitiesById(props.availableIds),
		usedAbilities: getAbilitiesById(props.usedIds || []),
		availablePqSpecifiers: props.availablePqSpecifiers,
		colors: props.colors,
		freeze: (colorChoices: AbilityChoice[][]) => {
			if ( !colorChoices ) {
				return "";
			}

			return colorChoices.map(choices => {
				console.log("xxy choices", {choices});
				const choiceStrings = choices.map(choice => [
					choice.id,
					sanitize(choice.config.name),
					choice.config.chosenPq?.id || "",
					choice.config.chosenText || "",
				].join(":"));

				return choiceStrings.join("|");
			}).join("#");
		},
		thaw: (frozenChoices: string = ""): AbilityChoice[][] | undefined => {
			if ( !frozenChoices ) {
				return undefined;
			}

			const colorStrings = frozenChoices.split("#");

			return colorStrings.map(colorString => {
				const choiceStrings = colorString.split("|");

				return choiceStrings.map(string => {
					const [
						id,
						name,
						chosenPqId,
						chosenText,
					] = string.split(":");
					const pq = getPowerQualityById(chosenPqId);

					const retVal: AbilityChoice = { id, config: {} };

					if ( name ) {
						retVal.config.name = desanitize(name);
					}
					if ( pq ) {
						retVal.config.chosenPq = pq;
					}
					if ( chosenText ) {
						retVal.config.chosenText = chosenText;
					}

					return retVal;
				});
			});
		},
	};
};
