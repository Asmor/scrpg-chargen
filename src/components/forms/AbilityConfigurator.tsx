import { Ability, AbilityConfiguration } from "@/data/abilities.types";
import AbilityDisplay from "./AbilityDisplay";
import Chooser, { ChooserOption } from "./Chooser";
import { useCallback, useMemo } from "react";
import TextInput from "./TextInput";
import { identity } from "lodash";
import PowerQualityPicker from "./PowerQualityPicker";
import { Character } from "@/character-builder/Character";
import Container from "../widgets/Container";

interface AbilityConfiguratorProps {
	ability: Ability;
	configuration?: AbilityConfiguration;
	pqSpecifiers?: string[];
	textOptions?: string[];
	onUpdateConfig: (config: AbilityConfiguration) => void;
	character: Character;
}

const AbilityConfigurator = ({
	ability,
	configuration,
	pqSpecifiers,
	textOptions,
	onUpdateConfig,
	character,
}: AbilityConfiguratorProps) => {
	const update = useCallback((vals: Partial<AbilityConfiguration>) => {
		onUpdateConfig({
			...configuration,
			...vals,
		});
	}, [
		configuration,
		onUpdateConfig,
	]);

	const configEls = useMemo(() => {
		const els: JSX.Element[] = [
			<TextInput
				key={0}
				title={ `Rename ${ability.name}` }
				text={ configuration?.name }
				onUpdate={val => update({ name: val })}
			/>
		];

		if ( pqSpecifiers ) {
			const availableIds = character.powersAndQualities
				.filter(pq =>
					pqSpecifiers.includes(pq.powerQuality.category)
					|| pqSpecifiers.includes(pq.powerQuality.id)
				).map(pq => pq.powerQuality.id);

			els.push(<PowerQualityPicker
				key={els.length}
				title={`Choose power or quality for ${ability.name}`}
				specifiers={availableIds}
				character={character}
				selected={[configuration?.chosenPq]}
				onSelect={([chosenPq]) => update({ chosenPq })}
				selectChosen={true}
			/>);
		}

		if ( textOptions ) {
			const textChooserOptions: ChooserOption<string>[] = textOptions.map(s => ({
				title: s,
				value: s,
			}));
			els.push(<Chooser
				key={els.length}
				title={ability.name}
				options={textChooserOptions}
				selected={[configuration?.chosenText].filter(identity) as string[]}
				onSelectOption={([chosenText]) => update({ chosenText })}
			/>)
		}

		return els;
	}, [
		ability,
		configuration,
		pqSpecifiers,
		textOptions,
		update,
	]);

	return <Container>
		<AbilityDisplay ability={ability} configuration={configuration}/>
		{ configEls }
	</Container>
};

export default AbilityConfigurator;
