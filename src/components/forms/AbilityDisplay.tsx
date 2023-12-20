import { Ability, AbilityConfiguration } from "@/data/abilities.types";
import { Container } from "@/util/commonElements";
import { useMemo } from "react";
import styled from "styled-components";

interface AbilityDisplayProps {
	ability: Ability;
	configuration?: AbilityConfiguration;
}

const AbilityName = styled.span`
	font-weight: bold;
	color: var(--accent-fg);
	margin-right: 5px;
`;

const AbilityText = styled.span``;

const AbilityDisplay = (props: AbilityDisplayProps) => {
	const { name, text } = useMemo(() => {
		let name = props.ability.name;

		if ( props.configuration?.name ) {
			name = props.configuration.name;
		}

		const textParts = props.ability.text.split(/[\[\]]/);
		const choice = props.configuration?.chosenPq?.name || props.configuration?.chosenText || "";

		const text = [<span key={0}>{textParts[0]}</span>];
		if ( textParts.length > 1 ) {
			textParts[1] = choice || `[${textParts[1]}]`

			text.push(
				<b key={1}>{textParts[1]}</b>,
				<span key={2}>{textParts[2]}</span>
			);
		}

		return {
			name,
			text,
		}
	}, [props.ability, props.configuration]);
	return <Container>
		<AbilityName>{ name }:</AbilityName>
		<AbilityText>{ text }</AbilityText>
	</Container>
};

export default AbilityDisplay;
