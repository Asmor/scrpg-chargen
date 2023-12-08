import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

export interface ChooserOption<T> {
	title: string;
	subtitle?: string;
	value: T;
}

export interface ChooserProps<T> {
	title: string;
	preferred?: number[];
	options: ChooserOption<T>[];
	selected?: T;
	onSelectOption: (selected: T) => void;
}

const OptionList = styled.ul<{ $collapsed?: boolean }>`
	display: ${ p => p.$collapsed ? "none" : "block" };
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

const SectionTitle = styled.h4`
	color: grey;
`;

const ShowMore = styled(SectionTitle)`
	cursor: pointer;
`;

const makeOptionButton = <T,>(
	option: ChooserOption<T>,
	onClick: () => void,
	selected?: ChooserOption<T>
) => (
	<OptionButton onClick={onClick} $selected={option === selected}>
		{ option.title }
		{ option.subtitle && <OptionSubtitle>{option.subtitle}</OptionSubtitle> }
	</OptionButton>
);

function Chooser<T>({ options, title, selected, preferred, onSelectOption }: ChooserProps<T>) {
	const [othersCollapsed, setOthersCollapsed] = useState(true);

	const selectedOption = useMemo<ChooserOption<T> | undefined>(() => {
		return options.find(option => option?.value === selected)
	}, [options, selected]);

	const { preferredOptions, otherOptions } = useMemo(() => {
		if ( !preferred?.length ) {
			return {
				preferredOptions: options.filter(option => option),
				otherOptions: null,
			};
		}

		const preferredOptions: ChooserOption<T>[] = [];
		const otherOptions: ChooserOption<T>[] = [];

		options.forEach((option, index) => {
			if ( !option ) return;

			if ( preferred.includes(index) ) {
				preferredOptions.push(option);
			} else {
				otherOptions.push(option);
			}
		});

		return { preferredOptions, otherOptions};
	}, [preferred, options]);

	const [editMode, setEditMode] = useState(false);

	const handleSelect = useCallback((option: ChooserOption<T>) => {
		setEditMode(false);
		onSelectOption(option.value);
	}, [onSelectOption]);

	if ( selectedOption && !editMode ) {
		return <div>{ title }: {
			makeOptionButton(selectedOption, setEditMode.bind(null, true), selectedOption)
		}</div>
	}

	return <div>
		<h3>Choose {title}</h3>
		<SectionTitle>Recommended</SectionTitle>
		<OptionList>
			{preferredOptions.map( (option, index) =>
				<li key={index}>
					{ makeOptionButton(option, () => handleSelect(option), selectedOption) }
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
						{ makeOptionButton(option, () => handleSelect(option), selectedOption) }
					</li>
				)}
			</OptionList>
		</> }
	</div>;
}

export default Chooser;
