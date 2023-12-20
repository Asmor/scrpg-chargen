import { Character } from "@/character-builder/Character";
import { Ability, AbilityChoice, AbilityColor } from "@/data/abilities.types";
import ColorAbilityChooser from "./ColorAbilityChooser";
import { cloneDeep } from "lodash";
import Container from "../widgets/Container";

export interface AbilityChooserColorDetails {
	color: AbilityColor;
	picks: number;
}

interface AbilityChooserProps {
	abilities: Ability[];
	usedAbilities: Ability[];
	availablePqSpecifiers?: string[];
	chosenAbilities?: AbilityChoice[][];
	onUpdate: (choices: AbilityChoice[][]) => void;
	character: Character;
	colors: AbilityChooserColorDetails[];
}

const AbilityChooser = ({
	abilities,
	usedAbilities,
	availablePqSpecifiers,
	chosenAbilities,
	onUpdate,
	character,
	colors,
}: AbilityChooserProps) => {
	const update = (index: number, choices: AbilityChoice[]) => {
		const newChoices = cloneDeep(chosenAbilities) || [];
		newChoices[index] = choices;
		onUpdate(newChoices);
	};

	const choosers = colors.map(({ color, picks }, index) => <ColorAbilityChooser
		key={color}
		color={color}
		abilities={abilities}
		character={character}
		usedAbilities={usedAbilities}
		availablePqSpecifiers={availablePqSpecifiers}
		chosenAbilities={chosenAbilities?.[index]}
		onUpdate={(abiltityChoices) => update(index, abiltityChoices)}
		picks={picks}
	/>)

	return <Container>{choosers}</Container>;
};

export default AbilityChooser;
