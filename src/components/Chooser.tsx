import { Entry, Rollable } from "@/types/common";
import { Container, SectionHeader, SubHeader } from "@/util/commonElements";
import { identity } from "lodash";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

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
}

const OptionList = styled.ul<{ $collapsed?: boolean }>`
	display: ${ p => p.$collapsed ? "none" : "flex" };
	flex-wrap: wrap;
`;

const OptionButton = styled.button<{ $selected?: boolean }>`
	font-weight: bold;
	cursor: pointer;
	padding: 5px;
	margin: 5px;
	background-color: var(${
		p => p.$selected ? "--accent-bg-emphasized" : "--accent-bg"
	});
	color: var(--foreground);
`;

const OptionSubtitle = styled.span`
	font-size: 0.8em;
	font-style: italic;
	font-weight: normal;
	color: var(--supplemental);
	margin-left: 5px;
`;

const ShowMore = styled(SectionHeader)`
	cursor: pointer;
`;

const makeOptionButton = <T,>(
	option: ChooserOption<T>,
	onClick: () => void,
	selected?: boolean,
) => (
	<OptionButton onClick={onClick} $selected={selected}>
		{ option.title }
		{ option.subtitle && <OptionSubtitle>{option.subtitle}</OptionSubtitle> }
	</OptionButton>
);

function Chooser<T extends Partial<Rollable> & object>({
	options,
	unavailable,
	title,
	selected,
	rolled,
	onSelectOption,
	choices = 1,
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

			if ( rolled.includes(option.value?.roll || -1) ) {
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

		console.log("xxy Updating with new selected", {oldSelected: selected, newSelected, selectedIndex});
		onSelectOption(newSelected);
	}, [onSelectOption]);

	if ( selectedOptions.length === choices ) {
		return <Container>{ title }: {
			selectedOptions.map((selectedOption, index) =>
				<span key={index}>
					{makeOptionButton(selectedOption, () => handleSelect(selectedOption), true)}
				</span>
			)
		}</Container>
	}

	return <Container>
		<SubHeader>Choose {title}</SubHeader>
		{ otherOptions?.length && <SectionHeader>Rolled options</SectionHeader>}
		<OptionList>
			{primaryOptions.map( (option, index) =>
				<li key={index}>
					{ makeOptionButton(option, () => handleSelect(option), selectedOptions.includes(option)) }
				</li>
			)}
		</OptionList>
		{ otherOptions?.length && <>
			<ShowMore onClick={ () => setOthersCollapsed(!othersCollapsed) }>
				{ othersCollapsed ? "Show" : "Hide" } additional options
			</ShowMore>
			<OptionList $collapsed={othersCollapsed}>
				{otherOptions.map((option, index) =>
					<li key={index}>
						{makeOptionButton(option, () => handleSelect(option), selectedOptions.includes(option)) }
					</li>
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