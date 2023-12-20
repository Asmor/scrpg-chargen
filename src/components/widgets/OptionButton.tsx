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
import styled, { css } from "styled-components";
import { PowerCategory, QualityCategory } from "@/data/powersQualities.types";
import { useMemo } from "react";
import { isPower, isPowerQuality } from "@/data/powersQualities";
import { isAbility } from "@/data/abilities";

interface OptionButtonProps<T> {
	value: T;
	selected?: boolean;
	collapse?: boolean;
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

const StyledOptionButton = styled.button<{
	$selected?: boolean,
}>`
	cursor: pointer;
	padding: 5px;
	margin: 5px;
	background-color: var(${p => p.$selected ? "--accent-bg-emphasized" : "--accent-bg"
	});
	color: var(--foreground);
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-template-areas:
		"icon title page"
		"icon subtitle subtitle"
		"icon full-text full-text"
	;
	 // don't use gap, it will leave spacing even if other columns or rows are
	 // empty
	gap: 0 !important;
	text-align: left;
	border: 3px solid var(--accent-fg);
	border-radius: 10px;

	&:hover {
		border-color: var(--accent-fg-emphasized);
	}
`;

const OptionIcon = styled.div<{$cat: PowerCategory | QualityCategory}>`
	grid-area: icon;
	display: inline-block;
	height: 100%;
	width: 40px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	background-image: url(${ p => getPqCatIcon(p.$cat) });
	margin-right: 5px;
`;

const OptionTitle = styled.span`
	grid-area: title;
	font-weight: bold;
	font-size: 1.2rem;
`;

const OptionSubtitle = styled.span`
	grid-area: subtitle;
	font-size: 0.8rem;
	margin-top: 5px;
`;

const OptionPage = styled.span`
	grid-area: page;
	font-size: 0.8rem;
	line-height: 1.2rem;
	margin-left: 5px;
`;

const OptionFullText = styled.span`
	grid-area: full-text;
	margin-top: 5px;
`;

const OptionButton = <T,>({
	value,
	selected,
	collapse,
	onClick,
}: OptionButtonProps<T>) => {
	const {
		icon,
		title,
		subtitle,
		fullText,
		page,
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
			? <OptionIcon $cat={value.category} />
			: null;

		let subtitleText = ``;

		if ( isPowerQuality(value) ) {
			subtitleText = [
				value.category,
				isPower(value) ? "Power" : "Quality"
			].join(" ");
		}

		const valueIsAbility = isAbility(value);

		const fullText = !collapse && valueIsAbility
			? <OptionFullText>{ value.text }</OptionFullText>
			: null;

		return {
			icon,
			title,
			page: `pg. ${value.page}`,
			subtitle: subtitleText
				? <OptionSubtitle>{subtitleText}</OptionSubtitle>
				: null,
			fullText,
		};
	}, [value, collapse]);

	return <StyledOptionButton
		onClick={() => onClick(value)}
		$selected={selected}
	>
		{ icon }
		<OptionTitle>{ title }</OptionTitle>
		<OptionPage>{page}</OptionPage>
		{ subtitle }
		{ fullText }
	</StyledOptionButton>
};

export default OptionButton;
