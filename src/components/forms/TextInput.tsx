import Container from "../widgets/Container";

interface TextInputProps {
	text?: string;
	title: string;
	onUpdate: (val: string) => void;
}

const TextInput = (props: TextInputProps) => {
	return <Container>
		{ props.title }: <input
			value={props.text || ""}
			onChange={val => props.onUpdate(val.target.value)}
		/>
	</Container>
};

export default TextInput;
