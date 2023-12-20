import { Ability, AbilityColor, AbilityConfiguration } from "@/data/abilities.types";
import { SubHeader } from "@/util/commonElements";
import { useCallback, useMemo } from "react";
import { cloneDeep, isEqual } from "lodash";
import { getAbilityById } from "@/data/abilities";
import AbilityConfigurator from "./AbilityConfigurator";
import Chooser, { makeOption } from "./Chooser";
import { Character } from "@/character-builder/Character";
import Container from "../widgets/Container";

interface AbilityChooserProps {
	abilities: Ability[];
	usedAbilities: Ability[];
	availablePqSpecifiers?: string[];
	availableTextOptions?: string[];
	greenPicks: number;
	yellowPicks: number;
	redPicks: number;
	chosenAbilities?: AbilityChoice[];
	onUpdate: (choices: AbilityChoice[]) => void;
	character: Character;
}

export interface AbilityChoice {
	id: string;
	config: AbilityConfiguration;
}

const AbilityChooser = ({
	abilities,
	usedAbilities,
	availablePqSpecifiers,
	availableTextOptions,
	greenPicks,
	yellowPicks,
	redPicks,
	chosenAbilities,
	onUpdate,
	character,
}: AbilityChooserProps) => {
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

		if ( greenPicks ) {
			const configurators: JSX.Element[] = [];
			for ( let i = 0; i < greenPicks; i++ ) {
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
				<SubHeader>Choose {greenPicks} green abilities</SubHeader>
				<Chooser
					title="Todo ability chooser title"
					options={abilitiesByColor[AbilityColor.GREEN].map(
						ability => makeOption(ability)
					)}
					onSelectOption={(abilities) => updateChosenPowers(abilities)}
					unavailable={usedAbilities}
					choices={greenPicks}
					selected={ chosenAbilities?.map(
						choice => getAbilityById(choice.id) as Ability
					) }
				/>
				{ configurators }
			</Container>);
		}
		return formEls;
	}, [
		chosenAbilities,
		abilities,
		greenPicks,
		usedAbilities,
		updateConfig,
		updateChosenPowers,
	]);

	return <Container>
		{formEls}
	</Container>;
};

export default AbilityChooser;
