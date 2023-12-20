import PowerAthleticIcon from "@/assets/svg/power-athletic.svg";
import PowerElementalEnergyIcon from "@/assets/svg/power-elemental-energy.svg";
import PowerHallmarkIcon from "@/assets/svg/power-hallmark.svg";
import PowerIntellectualIcon from "@/assets/svg/power-intellectual.svg";
import PowerMaterialsIcon from "@/assets/svg/power-materials.svg";
import PowerMobilityIcon from "@/assets/svg/power-mobility.svg";
import PowerPsychicIcon from "@/assets/svg/power-psychic.svg";
import PowerSelfControlIcon from "@/assets/svg/power-self-control.svg";
import PowerTechnologicalIcon from "@/assets/svg/power-technological.svg";
import QualityInformationIcon from "@/assets/svg/quality-information.svg";
import QualityMentalIcon from "@/assets/svg/quality-mental.svg";
import QualityPhysicalIcon from "@/assets/svg/quality-physical.svg";
import QualitySocialIcon from "@/assets/svg/quality-social.svg";
import QualityRoleplayingIcon from "@/assets/svg/quality-roleplaying.svg";

import { isEntry } from "@/types/common";
import styled from "styled-components";
import { PowerCategory, QualityCategory } from "@/data/powersQualities.types";
import { useMemo } from "react";
import { isPower, isPowerQuality } from "@/data/powersQualities";

interface OptionButtonProps<T> {
	value: T;
	selected?: boolean;
	onClick: (value: T) => void;
};

const pqCatToIconSrc = {
	[PowerCategory.ALL]: "",
	[QualityCategory.ALL]: "",
	[PowerCategory.ATHLETIC]: PowerAthleticIcon.src,
	[PowerCategory.ELEMENTAL_ENERGY]: PowerElementalEnergyIcon.src,
	[PowerCategory.HALLMARK]: PowerHallmarkIcon.src,
	[PowerCategory.INTELLECTUAL]: PowerIntellectualIcon.src,
	[PowerCategory.MATERIALS]: PowerMaterialsIcon.src,
	[PowerCategory.MOBILITY]: PowerMobilityIcon.src,
	[PowerCategory.PSYCHIC]: PowerPsychicIcon.src,
	[PowerCategory.SELF_CONTROL]: PowerSelfControlIcon.src,
	[PowerCategory.TECHNOLOGICAL]: PowerTechnologicalIcon.src,
	[QualityCategory.INFORMATION]: QualityInformationIcon.src,
	[QualityCategory.MENTAL]: QualityMentalIcon.src,
	[QualityCategory.PHYSICAL]: QualityPhysicalIcon.src,
	[QualityCategory.SOCIAL]: QualitySocialIcon.src,
	[QualityCategory.ROLEPLAYING]: QualityRoleplayingIcon.src,
};

const getPqCatIcon = (cat: PowerCategory | QualityCategory) => pqCatToIconSrc[cat];

const StyledOptionButton = styled.button<{ $selected?: boolean }>`
	cursor: pointer;
	padding: 5px;
	margin: 5px;
	background-color: var(${p => p.$selected ? "--accent-bg-emphasized" : "--accent-bg"
	});
	color: var(--foreground);
	display: grid;
	grid-template-areas:
		"icon title"
		"icon subtitle"
	;
	gap: 5px;
	text-align: left;
	border: 3px solid var(--accent-fg);
	border-radius: 10px;

	&:hover {
		border-color: var(--accent-fg-emphasized);
	}
`;

const OptionIcon = styled.div<{cat: PowerCategory | QualityCategory}>`
	grid-area: icon;
	display: inline-block;
	height: 40px;
	width: 40px;
	background-size: contain;
	background-image: url(${ p => getPqCatIcon(p.cat) });
`;

const OptionTitle = styled.span`
	grid-area: title;
	font-weight: bold;
`;

const OptionSubtitle = styled.span`
	grid-area: subtitle;
	font-size: 0.8rem;
`;

const OptionButton = <T,>({
	value,
	selected,
	onClick,
}: OptionButtonProps<T>) => {
	const {
		icon,
		title,
		subtitle,
	} = useMemo(() => {
		if ( !isEntry(value) ) {
			return {
				icon: null,
				title: value as string,
				subtitle: null,
			};
		}

		const title = value.name;
		const icon = isPowerQuality(value)
			? <OptionIcon cat={value.category} />
			: null;

		const subtitleParts = [`pg. ${value.page}`];

		if ( isPowerQuality(value) ) {
			subtitleParts.unshift(
				value.category,
				isPower(value) ? "Power" : "Quality"
			)
		}

		return {
			icon,
			title,
			subtitle: subtitleParts.join(" "),
		};
	}, [value]);

	return <StyledOptionButton onClick={() => onClick(value)} $selected={selected}>
		{ icon }
		<OptionTitle>{ title }</OptionTitle>
		<OptionSubtitle>{ subtitle }</OptionSubtitle>
	</StyledOptionButton>
};

export default OptionButton;
