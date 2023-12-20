import { Ability, AbilityChoice, AbilityColor, AbilityConfiguration } from "@/data/abilities.types";
import { SubHeader } from "@/util/commonElements";
import { useCallback, useMemo } from "react";
import { cloneDeep, isEqual } from "lodash";
import { getAbilityById } from "@/data/abilities";
import AbilityConfigurator from "./AbilityConfigurator";
import Chooser, { makeOption } from "./Chooser";
import { Character } from "@/character-builder/Character";
import Container from "../widgets/Container";

interface ColorAbilityChooserProps {
	abilities: Ability[];
	usedAbilities: Ability[];
	availablePqSpecifiers?: string[];
	availableTextOptions?: string[];
	picks: number;
	color: AbilityColor;
	chosenAbilities?: AbilityChoice[];
	onUpdate: (choices: AbilityChoice[]) => void;
	character: Character;
}

const ColorAbilityChooser = ({
	abilities,
	usedAbilities,
	availablePqSpecifiers,
	availableTextOptions,
	picks,
	color,
	chosenAbilities,
	onUpdate,
	character,
}: ColorAbilityChooserProps) => {
	const abilitiesByColor = useMemo(() => {
		const abilitiesByColor = {
			[AbilityColor.GREEN]: [] as Ability[],
			[AbilityColor.YELLOW]: [] as Ability[],
			[AbilityColor.RED]: [] as Ability[],
			[AbilityColor.OUT]: [] as Ability[],
		};

		abilities.forEach(
			ability => abilitiesByColor[ability.color].push(ability)
		)

		return abilitiesByColor;
	}, [abilities]);

	const update = useCallback((newAbilityChoices: AbilityChoice[]) => {
		if ( isEqual(newAbilityChoices, chosenAbilities) ) {
			return;
		}

		onUpdate(newAbilityChoices);
	}, [chosenAbilities, onUpdate]);

	const updateChosenPowers = useCallback((abilities: Ability[]) => {
		const newAbilityChoices = cloneDeep(chosenAbilities || [])
			// prune removed abilities
			.filter(abilityChoice => abilities.some(
				ability => abilityChoice.id === ability.id
			))
		;

		abilities.forEach(ability => {
			let abilityIndex = newAbilityChoices.findIndex(
				(newAbility) => newAbility.id === ability.id
			);
			// add new abilities
			if ( abilityIndex === -1 ) {
				newAbilityChoices.push({
					id: ability.id,
					config: {},
				});
			}
		});

		update(newAbilityChoices);
	}, [chosenAbilities, update]);

	const updateConfig = useCallback((index: number, config: AbilityConfiguration) => {
		const newAbilityChoices = cloneDeep(chosenAbilities || []);
		newAbilityChoices[index].config = config;

		update(newAbilityChoices);
	}, [chosenAbilities, update]);

	const formEls = useMemo(() => {
		const formEls: JSX.Element[] = [];

		const configurators: JSX.Element[] = [];
		for ( let i = 0; i < picks; i++ ) {
			const abilityChoice = chosenAbilities?.[i];
			if ( abilityChoice?.id ) {
				console.log("xxy abilityChoice", {abilityChoice})
				configurators.push(<AbilityConfigurator
					key={i}
					ability={getAbilityById(abilityChoice.id) as Ability}
					configuration={abilityChoice.config}
					pqSpecifiers={availablePqSpecifiers}
					textOptions={availableTextOptions}
					onUpdateConfig={config => updateConfig(i, config)}
					character={character}
				/>)
			} else {
				configurators.push(<Container key={i}>Select an ability</Container>)
			}
		}

		formEls.push(<Container key={formEls.length}>
			<SubHeader>Choose {picks} {color} abilities</SubHeader>
			<Chooser
				title={`Choose ${picks} ${color} Abilities`}
				selectedLabel={`${color} Abilities`}
				options={abilitiesByColor[color].map(
					ability => makeOption(ability)
				)}
				onSelectOption={(abilities) => updateChosenPowers(abilities)}
				unavailable={usedAbilities}
				choices={picks}
				selected={ chosenAbilities?.map(
					choice => getAbilityById(choice.id) as Ability
				) }
			/>
			{ configurators }
		</Container>);

		return formEls;
	}, [
		chosenAbilities,
		abilities,
		picks,
		usedAbilities,
		updateConfig,
		updateChosenPowers,
	]);

	return <Container>
		{formEls}
	</Container>;
};

export default ColorAbilityChooser;
