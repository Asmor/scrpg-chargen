import { useRecoilValue } from "recoil";
import { flattenSide } from "@/atoms/ui";
import styled, { css } from "styled-components";

const flatCss = css`
	border: 0;
	margin-left: 0;
	padding-left: 0;
`;

const ContainerEl = styled.div<{flat: boolean}>`
	margin: 5px;
	padding: 5px;
	border: 3px solid var(--accent-fg);
	border-width: 0 0 0 3px;

	${p => p.flat && flatCss }
`;

interface ContainerProps {
	children: any;
	className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
	const flatten = useRecoilValue(flattenSide);

	return <ContainerEl flat={flatten} className={className}>{ children }</ContainerEl>
};

export default Container;
