"use client";
import { useState } from "react";
import styled from "styled-components";

export interface ChooserOption<T> {
	title: string;
	subtitle?: string;
	value: T;
}

export interface ChooserOptions<T> {
	preferred: ChooserOption<T>[],
	other: ChooserOption<T>[],
}

export interface ChooserProps<T> {
	title: string;
	options: ChooserOptions<T>
}

const OptionList = styled.ul<{ $collapsed?: boolean }>`
	// color: ${ p => p.$collapsed ? "red" : "blue" };
	display: ${ p => p.$collapsed ? "none" : "block" };
`;

const OptionTitle = styled.li`
	font-weight: bold;
	cursor: pointer;
	padding: 5px;
	margin: 5px;
	border: 2px dashed transparent;

	&:hover {
		border-color: grey;
	}
`;

const OptionSubtitle = styled.span`
	font-size: 0.8em;
	font-style: italic;
	font-weight: normal;
	color: yellow;
	margin-left: 5px;
`;

const makeOptionTitle = <T,>(option: ChooserOption<T>, index: number) => (<OptionTitle key={index}>
	{ option.title }
	{ option.subtitle && <OptionSubtitle>{option.subtitle}</OptionSubtitle> }
</OptionTitle>);

export default function Chooser<T>({ options, title }: ChooserProps<T>) {
	const [othersCollapsed, setOthersCollapsed] = useState(true);
	return <div>
		<h1>{title}</h1>
		<OptionList>
			{ options.preferred.map(makeOptionTitle) }
		</OptionList>
		<button onClick={ () => setOthersCollapsed(!othersCollapsed) }>toggle</button>
		<OptionList $collapsed={othersCollapsed}>
			{options.other.map(makeOptionTitle)}
		</OptionList>
	</div>;
}
