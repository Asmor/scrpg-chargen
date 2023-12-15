import { Ability, AbilityConfiguration } from "@/data/abilities.types";
import { PowerQuality } from "@/data/powersQualities.types";
import { Container } from "@/util/commonElements";
import AbilityDisplay from "./AbilityDisplay";
import Chooser, { ChooserOption, makeOption } from "./Chooser";
import { useCallback, useMemo } from "react";
import TextInput from "./TextInput";

interface AbilityConfiguratorProps {
	ability: Ability;
	configuration?: AbilityConfiguration;
	pqOptions?: PowerQuality[];
	textOptions?: string[];
	onUpdateConfig: (config: AbilityConfiguration) => void;
}

const makePqOptions = (pqs: PowerQuality[]) => {
	return pqs.map(pq => makeOption(pq));
};
// const makeTextOptions = (vals: string[]): ChooserOption<string>[] => vals.map(val => ({
// 	title: val,
// 	value: val,
// }));

const AbilityConfigurator = (props: AbilityConfiguratorProps) => {
	const update = useCallback((vals: Partial<AbilityConfiguration>) => {
		props.onUpdateConfig({
			...props.configuration,
			...vals,
		});
	}, [props.configuration, props.onUpdateConfig])

	const configEls = useMemo(() => {
		const els: JSX.Element[] = [
			<TextInput
				key={0}
				title={ `Rename ${props.ability.name}` }
				text={ props.configuration?.name }
				onUpdate={val => update({ name: val })}
			/>
		];

		if ( props.pqOptions ) {
			const pqOptions = makePqOptions(props.pqOptions);
			els.push(<Chooser
				key={els.length}
				title={props.ability.name}
				options={pqOptions}
				selected={props.configuration?.chosenPq}
				onSelectOption={chosenPq => update({ chosenPq })}
			/>)
		}

		console.log("xxy text options", props.textOptions)
		if ( props.textOptions ) {
			const textOptions: ChooserOption<string>[] = props.textOptions.map(s => ({
				title: s,
				value: s,
			}));
			els.push(<Chooser
				key={els.length}
				title={props.ability.name}
				options={textOptions}
				selected={props.configuration?.chosenText}
				onSelectOption={chosenText => update({ chosenText })}
			/>)
		}

		return els;
	}, [props.ability, props.configuration]);

	return <Container>
		<AbilityDisplay ability={props.ability} configuration={props.configuration}/>
		{ configEls }
	</Container>
};

export default AbilityConfigurator;
