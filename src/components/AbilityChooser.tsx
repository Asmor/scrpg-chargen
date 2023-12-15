import { Ability, AbilityColor } from "@/data/abilities.types";
import { Container, SubHeader } from "@/util/commonElements";
import { useMemo } from "react";

interface AbilityChooserProps {
	abilities: Ability[];
	greenPicks: number;
	yellowPicks: number;
	redPicks: number;
}

const AbilityChooser = (props: AbilityChooserProps) => {
	const abilitiesByColor = useMemo(() => {
		const abilitiesByColor = {
			[AbilityColor.GREEN]: [] as Ability[],
			[AbilityColor.YELLOW]: [] as Ability[],
			[AbilityColor.RED]: [] as Ability[],
			[AbilityColor.OUT]: [] as Ability[],
		};

		props.abilities.forEach(
			ability => abilitiesByColor[ability.color].push(ability)
		)

		return abilitiesByColor;
	}, [props.abilities]);

	const formEls = useMemo(() => {
		console.warn("xxy don't forget to update the dependencies array!");
		const formEls: JSX.Element[] = [];

		if ( props.greenPicks ) {
			formEls.push(<Container>
				<SubHeader>Choose {props.greenPicks} green abilities</SubHeader>
				{  }
			</Container>);
		}
		return formEls;
	}, []);
};
