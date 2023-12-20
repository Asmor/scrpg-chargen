import { Ability } from "@/data/abilities.types";
import { Question, QuestionProps, QuestionType } from "../Question";
import { getAbilityById } from "@/data/abilities";
import { identity } from "lodash";
import { getPowerQualityById } from "@/data/powersQualities";
import { AbilityChoice } from "@/components/forms/AbilityChooser";

export interface AbilityQuestion extends Question {
	greenPicks: number;
	yellowPicks: number;
	redPicks: number;
	availableAbilities: Ability[];
	usedAbilities: Ability[];
	availablePqSpecifiers: string[];
}

interface AbilityQuestionProps extends QuestionProps {
	title: string;
	greenPicks: number;
	yellowPicks: number;
	redPicks: number;
	availableIds: string[];
	usedIds?: string[];
	availablePqSpecifiers: string[];
}

const getAbilitiesById = (ids: string[]) => ids.map((id) => getAbilityById(id))
	.filter(identity) as Ability[];

const COLON_PLACEHOLDER = "@@COLON@@";
const PIPE_PLACEHOLDER = "@@PIPE@@";

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
		freeze: (choices: AbilityChoice[]) => {
			if ( !choices ) {
				return "";
			}

			const choiceStrings = choices.map(choice => [
				choice.id,
				choice.config.name
					?.replace(/:/g, COLON_PLACEHOLDER)
					.replace(/\|/g, PIPE_PLACEHOLDER)
					|| "",
				choice.config.chosenPq?.id || "",
				choice.config.chosenText || "",
			].join(":"));

			return choiceStrings.join("|");
		},
		thaw: (frozenChoices: string = ""): AbilityChoice[] | undefined => {
			if ( !frozenChoices ) {
				return undefined;
			}

			const choiceStrings = frozenChoices.split("|");

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
					retVal.config.name = name
						.replaceAll(COLON_PLACEHOLDER, ":")
						.replaceAll(PIPE_PLACEHOLDER, "|")
					;
				}
				if ( pq ) {
					retVal.config.chosenPq = pq;
				}
				if ( chosenText ) {
					retVal.config.chosenText = chosenText;
				}

				return retVal;
			});
		},
	};
};
