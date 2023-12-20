import { Ability, AbilityConfiguration } from "@/data/abilities.types";
import { Container } from "@/util/commonElements";
import AbilityDisplay from "./AbilityDisplay";
import Chooser, { ChooserOption } from "./Chooser";
import { useCallback, useMemo } from "react";
import TextInput from "./TextInput";
import { identity } from "lodash";
import PowerQualityPicker from "./PowerQualityPicker";
import { Character } from "@/character-builder/Character";

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
			els.push(<PowerQualityPicker
				key={els.length}
				title="todo ability pq picker"
				specifiers={pqSpecifiers}
				character={character}
				selected={[configuration?.chosenPq]}
				onSelect={([chosenPq]) => update({ chosenPq })}
			/>)
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
