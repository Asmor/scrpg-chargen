import { Entry, Rollable, isRollable } from "@/types/common";
import Container from "@/components/widgets/Container";
import { SectionHeader, SubHeader } from "@/util/commonElements";
import { identity } from "lodash";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import OptionButton from "../widgets/OptionButton";

export interface ChooserOption<T> {
	title: string;
	subtitle?: string;
	value: T;
}

export interface ChooserProps<T> {
	title: string;
	rolled?: number[];
	options: ChooserOption<T>[];
	choices?: number;
	selected?: T[];
	onSelectOption: (selected: T[]) => void;
	unavailable?: T[];
	selectedLabel?: string;
}

const SelectedContainer = styled(Container)`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const SelectedLabel = styled.span`
	font-weight: bold;
	font-size: 1.5rem;
`;

const OptionList = styled.div<{ $collapsed?: boolean }>`
	display: ${ p => p.$collapsed ? "none" : "flex" };
	flex-wrap: wrap;
`;

const ShowMore = styled(SectionHeader)`
	cursor: pointer;
`;

function Chooser<T extends (Partial<Rollable> & object) | string>({
	options,
	unavailable,
	title,
	selected,
	rolled,
	onSelectOption,
	choices = 1,
	selectedLabel,
}: ChooserProps<T>) {
	const [othersCollapsed, setOthersCollapsed] = useState(true);

	const selectedOptions = useMemo<ChooserOption<T>[]>(() => {
		return options.filter(option => selected?.includes(option.value))
	}, [options, selected]);

	const availableOptions = useMemo(() => {
		return options.filter(option => {
			if ( !unavailable ) {
				return true;
			}

			if ( option.value === selected ) {
				return true;
			}

			return unavailable.every(value => option.value !== value);
		})
	}, [options, unavailable, selected]);

	const { primaryOptions, otherOptions } = useMemo(() => {
		if ( !rolled?.length ) {
			return {
				primaryOptions: [...availableOptions],
				otherOptions: null,
			};
		}

		const primaryOptions: ChooserOption<T>[] = [];
		const otherOptions: ChooserOption<T>[] = [];

		availableOptions.forEach((option) => {
			if ( !option ) return;

			if ( isRollable(option.value) && rolled.includes(option.value.roll) ) {
				primaryOptions.push(option);
			} else {
				otherOptions.push(option);
			}
		});

		return { primaryOptions, otherOptions};
	}, [rolled, availableOptions]);

	const handleSelect = useCallback((option: ChooserOption<T>) => {
		const newSelected = [...(selected || [])].filter(identity);
		const selectedIndex = newSelected.indexOf(option.value);
		if ( selectedIndex > -1 ) {
			newSelected.splice(selectedIndex, 1);
		} else {
			newSelected.push(option.value);
		}

		onSelectOption(newSelected);
	}, [onSelectOption, selected]);

	if ( selectedOptions.length === choices ) {
		return <SelectedContainer>
			<SelectedLabel>{selectedLabel || title}:</SelectedLabel>
			{
				selectedOptions.map((selectedOption, index) =>
					<OptionButton
						key={index}
						value={ selectedOption.value }
						selected={true}
						onClick={() => handleSelect(selectedOption)}
						collapse={true}
					/>
				)
			}
		</SelectedContainer>
	}

	return <Container>
		<SubHeader>Choose {title}</SubHeader>
		{ otherOptions?.length && <SectionHeader>Rolled options</SectionHeader>}
		<OptionList>
			{primaryOptions.map( (option, index) =>
				<OptionButton
					key={index}
					value={option.value}
					selected={selectedOptions.includes(option)}
					onClick={() => handleSelect(option)}
				/>
			)}
		</OptionList>
		{ otherOptions?.length && <>
			<ShowMore onClick={ () => setOthersCollapsed(!othersCollapsed) }>
				{ othersCollapsed ? "Show" : "Hide" } additional options
			</ShowMore>
			<OptionList $collapsed={othersCollapsed}>
				{otherOptions.map((option, index) =>
					<OptionButton
						key={index}
						value={option.value}
						selected={selectedOptions.includes(option)}
						onClick={() => handleSelect(option)}
					/>
				)}
			</OptionList>
		</> }
	</Container>;
}

export const makeOption = <T extends Entry,>(value: T): ChooserOption<T> => ({
	title: value.name,
	subtitle: `pg. ${value.page}`,
	value,
});

export default Chooser;
