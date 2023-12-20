"use client";

import { RecoilRoot } from "recoil";
import CharacterBuilder from "@/components/CharacterBuilder";
import { useMemo } from "react";
import Head from "next/head";

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

const icons = [
  PowerAthleticIcon,
  PowerElementalEnergyIcon,
  PowerHallmarkIcon,
  PowerIntellectualIcon,
  PowerMaterialsIcon,
  PowerMobilityIcon,
  PowerPsychicIcon,
  PowerSelfControlIcon,
  PowerTechnologicalIcon,
  QualityInformationIcon,
  QualityMentalIcon,
  QualityPhysicalIcon,
  QualitySocialIcon,
  QualityRoleplayingIcon,
];

export default function Home() {
  const preloads = useMemo(() => icons.map(
    (icon) => <link
      key={icon.src}
      rel="preload"
      href={icon.src}
      as="image"
    />
  ), []);

  return (
    <RecoilRoot>
      <Head>
        { preloads }
      </Head>
      <CharacterBuilder/>
    </RecoilRoot>
  );
}
