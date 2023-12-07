import Chooser, { ChooserOption, ChooserOptions } from "@/components/chooser";
import backgrounds, { Background } from "@/data/backgrounds";

const bgVals = Object.values(backgrounds);

const makeOption = (bg: Background): ChooserOption<Background> => ({
  name: bg.name,
  value: bg,
});

const opts: ChooserOptions<Background> = {
  preferred: [
    makeOption(bgVals[0]),
    makeOption(bgVals[1]),
  ],
  other: [
    makeOption(bgVals[2]),
    makeOption(bgVals[3]),
  ],
};

export default function Home() {
  return (
    <Chooser options={opts}/>
  )
}
