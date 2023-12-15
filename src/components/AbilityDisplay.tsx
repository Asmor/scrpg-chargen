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

		const text = [<>{textParts[0]}</>];
		if ( textParts.length > 1 ) {
			textParts[1] = choice || `[${textParts[1]}]`

			text.push(
				<b>{textParts[1]}</b>,
				<>{textParts[2]}</>
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
