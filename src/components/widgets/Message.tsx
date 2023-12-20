import { Container } from "@/util/commonElements";

interface MessageProps {
	children: (JSX.Element | string)[],
}

const Message = (props: MessageProps) => <Container>{ props.children }</Container>;

export default Message;
