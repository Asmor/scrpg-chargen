import { getAllPowerQualityByCategory, getPowerQualityById } from "@/data/powersQualities";
import { PowerCategory, PowerQuality, PowerQualitySpecifier, QualityCategory } from "@/data/powersQualities.types";
import { Die } from "@/types/common";
import { useMemo, useState } from "react";
import Chooser, { ChooserOption } from "./Chooser";
import { Container, SubHeader } from "@/util/commonElements";

interface LineMetadata {
	options: ChooserOption<PowerQuality>[],
	die: Die,
	selected?: PowerQuality,
	handleSelect: (value: PowerQuality) => void,
}

const sortOrder: ("type" | "category")[] = ["type", "category"];

const makeOption = (value: PowerQuality): ChooserOption<PowerQuality> => ({
	title: value.name,
	subtitle: `${value.category} ${value.type} pg. ${value.page}`,
	value,
});

const getOptionsForIndex = (index: number, allOptions: ChooserOption<PowerQuality>[], selectedPowerQualities: PowerQuality[]) =>
	allOptions.filter(option =>
		option.value === selectedPowerQualities[index]
		|| !selectedPowerQualities.includes(option.value)
	)

interface PowerQualityPickerProps {
	specifiers: PowerQualitySpecifier[];
	dice: Die[];
	selected: PowerQuality[];
	onSelect: (values: PowerQuality[]) => void;
}

const PowerQualityPicker = ({ selected, specifiers, dice, onSelect }: PowerQualityPickerProps) => {
	const options = useMemo(() => {
		const options: PowerQuality[] = [];

		specifiers.forEach(specifier => {
			const exactMatch = getPowerQualityById(specifier);

			if ( exactMatch ) {
				options.push(exactMatch);
			} else {
				options.push(...getAllPowerQualityByCategory(
					specifier as PowerCategory | QualityCategory
				));
			}
		});

		return options.sort((optA, optB) => {
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
				options={getOptionsForIndex(index, options, selected)}
				selected={selected[index]}
				title={`d${die}`}
				onSelectOption={(value) => {
					const newSelected = [...selected];
					newSelected[index] = value;
					onSelect(newSelected);
				}}
			/> )
		}),
		[options, selected, dice, onSelect]
	);

	return <Container>
		<SubHeader>Choose Powers and Qualities</SubHeader>
		{ choosers }
	</Container>
};

export default PowerQualityPicker;
