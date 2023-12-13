import powersAndQualities, { getAllPowerQualityByCategory, getPowerQualityById } from "@/data/powersQualities";
import { PowerCategory, PowerQuality, PowerQualitySpecifier, PowerQualityType, QualityCategory } from "@/data/powersQualities.types";
import { Die } from "@/types/common";
import { useMemo } from "react";
import Chooser, { ChooserOption } from "./Chooser";
import { Container, SubHeader } from "@/util/commonElements";

const sortOrder: ("type" | "category")[] = ["type", "category"];

const allPowers = powersAndQualities.filter(pq => pq.type === PowerQualityType.POWER);
const allQualities = powersAndQualities.filter(pq => pq.type === PowerQualityType.QUALITY);

const makeOption = (value: PowerQuality): ChooserOption<PowerQuality> => ({
	title: value.name,
	subtitle: `${value.category} ${value.type} pg. ${value.page}`,
	value,
});

const getOptionsForIndex = (
	selectedPq: PowerQuality | undefined,
	allOptions: ChooserOption<PowerQuality>[],
	usedPqs: (PowerQuality | undefined)[]
) => {
	return allOptions.filter(option =>
		option.value.id === selectedPq?.id
		|| usedPqs.every(pq => option.value.id !== pq?.id)
	);
}

interface PowerQualityPickerProps {
	title: string;
	specifiers: (string | PowerQualitySpecifier)[];
	dice: Die[];
	selected: (PowerQuality | undefined)[];
	used: (PowerQuality | undefined)[];
	onSelect: (values: (PowerQuality | undefined)[]) => void;
}

const PowerQualityPicker = ({ title, selected, specifiers, dice, onSelect, used }: PowerQualityPickerProps) => {
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

		return [...options].sort((optA, optB) => {
			const compareKey = sortOrder.find(
				key => optA[key] !== optB[key]
			) || "name";

			return optA[compareKey].localeCompare(optB[compareKey]);
		}).map(makeOption);
	}, [specifiers]);

	const choosers = useMemo(
		() => dice.map((die, index) => {
			return ( <Chooser
				key={index}
				options={getOptionsForIndex(selected[index], options, used)}
				selected={selected[index]}
				title={`d${die}`}
				onSelectOption={(value) => {
					const newSelected = [...selected];
					newSelected[index] = value;
					onSelect(newSelected);
				}}
			/> )
		}),
		[options, selected, dice, onSelect, used]
	);

	return <Container>
		<SubHeader>{title} Powers and Qualities</SubHeader>
		{ choosers }
	</Container>
};

export default PowerQualityPicker;
