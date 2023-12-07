"use client";
import styled from "styled-components";

export interface ChooserOption<T> {
	name: string;
	value: T;
}

export interface ChooserOptions<T> {
	preferred: ChooserOption<T>[],
	other: ChooserOption<T>[],
}

export interface ChooserProps<T> {
	options: ChooserOptions<T>
}

const OptionTitle = styled.li`
	font-weight: bold;
`;

export default function Chooser<T>({ options }: ChooserProps<T>) {
	const greeting = "Hello, worldd!";

	console.log("xxy options", options)

	return <div>
		<ul>
			{ options.preferred.map( (opt, index) =>
				<OptionTitle key={index}>{opt.name}</OptionTitle>
			)}
		</ul>
	</div>;
}
