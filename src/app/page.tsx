"use client";

import { RecoilRoot } from "recoil";
import CharacterBuilder from "@/components/CharacterBuilder";

export default function Home() {
  return (
    <RecoilRoot>
      <CharacterBuilder/>
    </RecoilRoot>
  )
}
