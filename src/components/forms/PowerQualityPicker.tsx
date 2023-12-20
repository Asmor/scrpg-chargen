import powersAndQualities, { getAllPowerQualityByCategory, getPowerQualityById } from "@/data/powersQualities";
import { PowerCategory, PowerQuality, PowerQualitySpecifier, PowerQualityType, QualityCategory } from "@/data/powersQualities.types";
import { Die } from "@/types/common";
import { useMemo } from "react";
import Chooser, { ChooserOption } from "./Chooser";
import Container from "@/components/widgets/Container";
import { SubHeader } from "@/util/commonElements";
import { Character } from "@/character-builder/Character";
import { identity } from "lodash";

const sortOrder: ("type" | "category")[] = ["type", "category"];

const allPowers = powersAndQualities.filter(pq => pq.type === PowerQualityType.POWER);
const allQualities = powersAndQualities.filter(pq => pq.type === PowerQualityType.QUALITY);

const makeOption = (value: PowerQuality): ChooserOption<PowerQuality> => ({
	title: value.name,
	subtitle: `${value.category} ${value.type} pg. ${value.page}`,
	value,
});

const getOptionsForPicker = (
	selectedPq: PowerQuality | undefined,
	allOptions: ChooserOption<PowerQuality>[],
	usedPqs: (PowerQuality | undefined)[],
	selectChosen: boolean,
) => {
	console.log("xxyzz", {selectedPq, allOptions, usedPqs});
	return allOptions.filter(option => {
		const isSelectedOption = option.value.id === selectedPq?.id;
		const isUsed = usedPqs.some(usedq => option.value.id === usedq?.id);

		return isSelectedOption || (selectChosen === isUsed);
	}
	);
}

interface PowerQualityPickerProps {
	title: string;
	specifiers: (string | PowerQualitySpecifier)[];
	dice?: Die[];
	selected: (PowerQuality | undefined)[];
	character: Character;
	onSelect: (values: (PowerQuality | undefined)[]) => void;
	selectChosen?: boolean;
}

const PowerQualityPicker = ({
	title,
	selected,
	specifiers,
	dice,
	onSelect,
	character,
	selectChosen,
}: PowerQualityPickerProps) => {
	const options = useMemo(() => {
		const options = new Set<PowerQuality>();

		specifiers.forEach(specifier => {
			if ( specifier === PowerCategory.ALL ) {
				allPowers.forEach(power => options.add(power));
			} else if ( specifier === QualityCategory.ALL ) {
				allQualities.forEach(quality => options.add(quality));
			} else {
				const exactMatch = getPowerQualityById(specifier);

				if ( exactMatch ) {
					options.add(exactMatch);
				} else {
					getAllPowerQualityByCategory(
						specifier as PowerCategory | QualityCategory
					).forEach(pq => options.add(pq));
				}
			}
		});

		console.log("xxyz pqp calculating options", {title}, {
			options: [...options].map(option => option.id),
			specifiers,
		});

		return [...options].sort((optA, optB) => {
			const compareKey = sortOrder.find(
				key => optA[key] !== optB[key]
			) || "name";

			return optA[compareKey].localeCompare(optB[compareKey]);
		}).map(makeOption);
	}, [specifiers]);

	const choosers = useMemo(
		() => (dice || [0]).map((die, index) => {
			const used = character.powersAndQualities.map(pq => pq.powerQuality);
			const selectedOption = [selected[index]].filter(identity) as PowerQuality[];

			return ( <Chooser
				key={index}
				options={getOptionsForPicker(selected[index], options, used, !!selectChosen)}
				selected={selectedOption}
				title={die ? `d${die}` : "todo title without die"}
				onSelectOption={([value]) => {
					const newSelected = [...selected];
					newSelected[index] = value;
					onSelect(newSelected);
				}}
			/> )
		}),
		[options, selected, dice, onSelect, character]
	);

	return <Container>
		<SubHeader>{title}</SubHeader>
		{ choosers }
	</Container>
};

export default PowerQualityPicker;
